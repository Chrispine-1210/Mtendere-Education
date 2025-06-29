import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost, MediaFile } from "@shared/schema";

export default function AdminContent() {
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    headerColor: "#1e40af",
    textColor: "#374151",
    isPublished: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: blogPosts, isLoading: blogsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog-posts"],
  });

  const { data: mediaFiles, isLoading: mediaLoading } = useQuery<MediaFile[]>({
    queryKey: ["/api/media"],
  });

  const createBlogMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/blog-posts", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to create blog post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setIsCreateBlogOpen(false);
      resetBlogForm();
      toast({
        title: "Blog post created",
        description: "Blog post has been created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const response = await fetch(`/api/blog-posts/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to update blog post");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setEditingBlog(null);
      resetBlogForm();
      toast({
        title: "Blog post updated",
        description: "Blog post has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/blog-posts/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Blog post deleted",
        description: "Blog post has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const uploadMediaMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to upload file");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({
        title: "File uploaded",
        description: "File has been uploaded successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    },
  });

  const resetBlogForm = () => {
    setBlogForm({
      title: "",
      content: "",
      headerColor: "#1e40af",
      textColor: "#374151",
      isPublished: false,
    });
    setSelectedFile(null);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      content: blog.content,
      headerColor: blog.headerColor || "#1e40af",
      textColor: blog.textColor || "#374151",
      isPublished: blog.isPublished,
    });
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogForm.title);
    formData.append("content", blogForm.content);
    formData.append("headerColor", blogForm.headerColor);
    formData.append("textColor", blogForm.textColor);
    formData.append("isPublished", blogForm.isPublished.toString());
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (editingBlog) {
      updateBlogMutation.mutate({ id: editingBlog.id, formData });
    } else {
      createBlogMutation.mutate(formData);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMediaMutation.mutate(file);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-gray-600">Manage blog posts, stories, and media files</p>
          </div>
        </div>

        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Blog Posts</h2>
              <Dialog open={isCreateBlogOpen} onOpenChange={setIsCreateBlogOpen}>
                <DialogTrigger asChild>
                  <Button>Create Blog Post</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Blog Post</DialogTitle>
                    <DialogDescription>
                      Create a new blog post or story
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        rows={10}
                        className="min-h-[200px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="headerColor">Header Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="headerColor"
                            type="color"
                            value={blogForm.headerColor}
                            onChange={(e) => setBlogForm({ ...blogForm, headerColor: e.target.value })}
                            className="w-16 h-10"
                          />
                          <Input
                            value={blogForm.headerColor}
                            onChange={(e) => setBlogForm({ ...blogForm, headerColor: e.target.value })}
                            placeholder="#1e40af"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="textColor">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="textColor"
                            type="color"
                            value={blogForm.textColor}
                            onChange={(e) => setBlogForm({ ...blogForm, textColor: e.target.value })}
                            className="w-16 h-10"
                          />
                          <Input
                            value={blogForm.textColor}
                            onChange={(e) => setBlogForm({ ...blogForm, textColor: e.target.value })}
                            placeholder="#374151"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="image">Featured Image</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isPublished"
                        checked={blogForm.isPublished}
                        onCheckedChange={(checked) => setBlogForm({ ...blogForm, isPublished: checked })}
                      />
                      <Label htmlFor="isPublished">Publish immediately</Label>
                    </div>

                    <Button type="submit" disabled={createBlogMutation.isPending}>
                      {createBlogMutation.isPending ? "Creating..." : "Create Blog Post"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Blog Posts</CardTitle>
                <CardDescription>
                  {blogPosts?.length || 0} blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blogsLoading ? (
                  <div className="loading-pulse">Loading blog posts...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Updated</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogPosts?.map((post) => (
                          <tr key={post.id}>
                            <td>
                              <div>
                                <div className="font-medium" style={{ color: post.headerColor }}>
                                  {post.title}
                                </div>
                                <div className="text-sm text-gray-600 truncate max-w-xs">
                                  {post.content}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`status-badge ${post.isPublished ? 'approved' : 'pending'}`}>
                                {post.isPublished ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                            <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                            <td>
                              <div className="flex space-x-2">
                                <Dialog open={editingBlog?.id === post.id} onOpenChange={(open) => !open && setEditingBlog(null)}>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleEditBlog(post)}
                                    >
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Edit Blog Post</DialogTitle>
                                      <DialogDescription>
                                        Update blog post content and settings
                                      </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                                      <div>
                                        <Label htmlFor="edit-title">Title</Label>
                                        <Input
                                          id="edit-title"
                                          value={blogForm.title}
                                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                          required
                                        />
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="edit-content">Content</Label>
                                        <Textarea
                                          id="edit-content"
                                          value={blogForm.content}
                                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                          rows={10}
                                          className="min-h-[200px]"
                                          required
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label htmlFor="edit-headerColor">Header Color</Label>
                                          <div className="flex items-center space-x-2">
                                            <Input
                                              id="edit-headerColor"
                                              type="color"
                                              value={blogForm.headerColor}
                                              onChange={(e) => setBlogForm({ ...blogForm, headerColor: e.target.value })}
                                              className="w-16 h-10"
                                            />
                                            <Input
                                              value={blogForm.headerColor}
                                              onChange={(e) => setBlogForm({ ...blogForm, headerColor: e.target.value })}
                                              placeholder="#1e40af"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <Label htmlFor="edit-textColor">Text Color</Label>
                                          <div className="flex items-center space-x-2">
                                            <Input
                                              id="edit-textColor"
                                              type="color"
                                              value={blogForm.textColor}
                                              onChange={(e) => setBlogForm({ ...blogForm, textColor: e.target.value })}
                                              className="w-16 h-10"
                                            />
                                            <Input
                                              value={blogForm.textColor}
                                              onChange={(e) => setBlogForm({ ...blogForm, textColor: e.target.value })}
                                              placeholder="#374151"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <Label htmlFor="edit-image">Featured Image</Label>
                                        <Input
                                          id="edit-image"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        />
                                        {post.imagePath && (
                                          <p className="text-sm text-gray-600 mt-1">
                                            Current image: {post.imagePath}
                                          </p>
                                        )}
                                      </div>

                                      <div className="flex items-center space-x-2">
                                        <Switch
                                          id="edit-isPublished"
                                          checked={blogForm.isPublished}
                                          onCheckedChange={(checked) => setBlogForm({ ...blogForm, isPublished: checked })}
                                        />
                                        <Label htmlFor="edit-isPublished">Published</Label>
                                      </div>

                                      <Button type="submit" disabled={updateBlogMutation.isPending}>
                                        {updateBlogMutation.isPending ? "Updating..." : "Update Blog Post"}
                                      </Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      Delete
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteBlogMutation.mutate(post.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        )) || (
                          <tr>
                            <td colSpan={5} className="text-center text-gray-500">
                              No blog posts found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Media Library</h2>
              <div>
                <input
                  type="file"
                  id="media-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,application/pdf,.doc,.docx"
                />
                <Button onClick={() => document.getElementById('media-upload')?.click()}>
                  Upload File
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
                <CardDescription>
                  {mediaFiles?.length || 0} files in media library
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mediaLoading ? (
                  <div className="loading-pulse">Loading media files...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {mediaFiles?.map((file) => (
                      <div key={file.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-center">
                          {file.mimetype.startsWith('image/') ? (
                            <img 
                              src={`/${file.path}`} 
                              alt={file.originalName}
                              className="w-full h-20 object-cover rounded mb-2"
                            />
                          ) : (
                            <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.447.894L12 15.382l-2.553 1.512A1 1 0 018 16V4z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          )}
                          <p className="text-xs font-medium truncate">{file.originalName}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 text-xs"
                            onClick={() => {
                              navigator.clipboard.writeText(`/${file.path}`);
                              toast({
                                title: "Copied",
                                description: "File path copied to clipboard",
                              });
                            }}
                          >
                            Copy Path
                          </Button>
                        </div>
                      </div>
                    )) || (
                      <div className="col-span-full text-center text-gray-500">
                        No files uploaded yet
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
