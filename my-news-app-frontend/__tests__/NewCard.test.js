import { render, screen, fireEvent } from "@testing-library/react";
import { useNews } from "../providers/NewsProvider";
import NewsCard from "../components/NewsCard";

jest.mock("../providers/NewsProvider", () => ({
  useNews: jest.fn(),
}));

describe("NewsCard Component", () => {
  const mockArchiveNews = jest.fn();
  const mockDeleteNew = jest.fn();

  beforeEach(() => {
    useNews.mockReturnValue({
      archiveNews: mockArchiveNews,
      deleteNew: mockDeleteNew,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the news card with correct content", () => {
    render(
      <NewsCard
        title="Sample News"
        image="sample.jpg"
        description="This is a test description"
        date="2025-01-30"
        archived={false}
      />
    );

    expect(screen.getByText("Sample News")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
    expect(screen.getByText("2025-01-30")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "sample.jpg");
    expect(screen.getByRole("button", { name: /archive/i })).toBeInTheDocument();
  });

  test("calls archiveNews when Archive button is clicked", () => {
    render(<NewsCard title="Sample News" archived={false} />);

    const archiveButton = screen.getByRole("button", { name: /archive/i });
    fireEvent.click(archiveButton);

    expect(mockArchiveNews).toHaveBeenCalledWith("Sample News");
  });

  test("calls deleteNew when Delete button is clicked (if archived)", () => {
    render(<NewsCard title="Sample News" archived={true} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteNew).toHaveBeenCalledWith("Sample News");
  });
});
