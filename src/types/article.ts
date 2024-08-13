
enum ArticleStatus {
  DRAFT,
  SHOW,
}
interface Article {
  id: number; // ID của bài viết
  title: string; // Tiêu đề của bài viết
  slug: string;
  status: number

  content: string | null; // Nội dung của bài viết
  author_id: number; // ID của tác giả (khóa ngoại)
  category_id: number; // ID của danh mục bài viết (khóa ngoại)
  created_at: string; // Ngày và giờ tạo bài viết
  updated_at: string; // Ngày và giờ cập nhật gần đây nhất
  published_date: string;
  description: string;
  thumnal_url: string

}


type ArticleCreateInput = {

  title: string; // Tiêu đề của bài viết
  slug: string;
  status: ArticleStatus
  content?: string; // Nội dung của bài viết
  description?: string;
  thumnal_url?: string
  meta_data?: {
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
  }

  category?: {
    connect: { id: number }
  };
  author?: {
    connect: { id: number }
  };
}


export type { Article, ArticleCreateInput }
export { ArticleStatus }