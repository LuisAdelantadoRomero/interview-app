import {render as rtlRender, screen, waitFor, act} from '@testing-library/react'
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import App from '../App';
import { rest } from 'msw'
import { ARCHIVES_URL, NEWS_URL, ONE_NEW_RESPONSE, ONE_NEW_RESPONSE_ARCHIVED } from '../constants'

const server = (newsResponse = [], archiveResponse = []) => setupServer(
  rest.get(NEWS_URL, (req, res, ctx) => {
    return res(
      ctx.status(202, 'Mocked status'),
      ctx.json(newsResponse),
    )
  }),
  rest.get(ARCHIVES_URL, (req, res, ctx) => {
    return res(
      ctx.status(202, 'Mocked status'),
      ctx.json(archiveResponse),
    )
  }),
  rest.put(`${NEWS_URL}/archive/${ONE_NEW_RESPONSE[0].title}`, (req, res, ctx) => {
    return res(
      ctx.status(202, 'Mocked status'),
      ctx.json(newsResponse),
    )
  }),
  rest.put(`${ARCHIVES_URL}/archive/${ONE_NEW_RESPONSE[0].title}`, (req, res, ctx) => {
    return res(
      ctx.status(202, 'Mocked status'),
      ctx.json(newsResponse),
    )
  }),
  rest.delete(`${NEWS_URL}/deleteNew/${ONE_NEW_RESPONSE_ARCHIVED[0].title}`, (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json(newsResponse),
    )
  }),
);

describe('Tests', () => {

// Enable request interception.
// beforeAll(() => server.listen())

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
// afterEach(() => server().resetHandlers())

// Don't forget to clean up afterwards.
afterAll(() => server().close())

// Ok, so here's what your tests might look like

// this is a handy function that I would utilize for any component
// that relies on the router being in context
  const render = (ui, {route = '/news'} = {}) => {
    return {
      user: userEvent.setup(),
      ...rtlRender(ui),
    }
  }

  test('Show 1 new', async () => {
    const serverMocked = server(ONE_NEW_RESPONSE);
    serverMocked.listen();
    const { unmount } = render(<App />)
    screen.getByTestId('news-empty')
    await waitFor(() => expect(screen.queryByTestId("new-card-title")).toBeInTheDocument());
    unmount();
    serverMocked.close()
  });

  test('0 news to show', async () => {
    const serverMocked = server([]);
    serverMocked.listen();
    const { unmount } = render(<App />)
    screen.getByTestId('news-empty')
    await waitFor(() => expect(screen.queryByTestId("new-card-title")).not.toBeInTheDocument());
    unmount();
    serverMocked.close()
  });

  test('Archive doc', async () => {
    const serverMocked = server(ONE_NEW_RESPONSE);
    serverMocked.listen();
    const { user, unmount } = render(<App />)
    screen.getByTestId('news-empty')
    await waitFor(() => expect(screen.queryByTestId("new-card-title")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByTestId("new-btn-title")).toBeInTheDocument());
    const button = screen.queryByTestId('new-btn-title');
    expect(button).toHaveProperty("disabled", false);
    await act(async () => {
      await user.click(button)
    })
    await waitFor(() => expect(screen.queryByTestId('new-card-title')).not.toBeInTheDocument());
    const newsBtn = screen.queryByTestId('layout-tabbutton-News');
    const archiveBtn = screen.queryByTestId('layout-tabbutton-Archived');
    expect(newsBtn).toHaveClass("active");
    expect(archiveBtn).not.toHaveClass("active");
    await act(async () => {
      await user.click(archiveBtn)
    })
    await waitFor(() => expect(screen.queryByTestId('layout-tabbutton-Archived')).toHaveClass("active"));
    await waitFor(() => expect(screen.queryByTestId('layout-tabbutton-News')).not.toHaveClass("active"));
    await waitFor(() => expect(screen.queryByTestId('new-card-title')).toBeInTheDocument());
    unmount();
    serverMocked.close()
  });

  /*test('Delete doc', async () => {
    const serverMocked = server([], ONE_NEW_RESPONSE_ARCHIVED);
    serverMocked.listen();
    const { user} = render(<App />)
    screen.getByTestId('archive-empty');
    const newsBtn = screen.queryByTestId('layout-tabbutton-News');
    const archiveBtn = screen.queryByTestId('layout-tabbutton-Archived');
    expect(archiveBtn).toHaveClass("active");
    await waitFor(() => expect(screen.queryByTestId('new-card-title')).toBeInTheDocument());
    const deleteBtn = screen.getByTestId("remove-btn-title");
    await act(async () => {
      await user.click(deleteBtn);
    });
    await waitFor(() => expect(screen.queryByTestId('new-card-title')).not.toBeInTheDocument());
    await act(async () => {
      await user.click(newsBtn)
    });
    await waitFor(() => expect(screen.queryByTestId('new-card-title')).not.toBeInTheDocument());
    serverMocked.close()
  });*/

});
