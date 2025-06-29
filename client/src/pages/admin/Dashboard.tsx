import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUpdateSiteData } from "@/hooks/use-site-data";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const updateSiteData = useUpdateSiteData();

  const { data: users } = useQuery({
    queryKey: ["/api/users"],
  });

  const { data: applications } = useQuery({
    queryKey: ["/api/applications"],
  });

  const { data: blogPosts } = useQuery({
    queryKey: ["/api/admin/blog-posts"],
  });

  const handleUpdateSiteData = () => {
    updateSiteData.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Site data updated",
          description: "Successfully scraped and updated content from the external website",
        });
      },
      onError: () => {
        toast({
          title: "Update failed",
          description: "Failed to update site data. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const stats = [
    {
      title: "Total Users",
      value: users?.length || 0,
      description: "Registered users in the system",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
      ),
    },
    {
      title: "Applications",
      value: applications?.length || 0,
      description: "Student applications submitted",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 011-1h6a1 1 0 011 1v1a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Blog Posts",
      value: blogPosts?.length || 0,
      description: "Published and draft blog posts",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.447.894L12 15.382l-2.553 1.512A1 1 0 018 16V4z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Pending Reviews",
      value: applications?.filter(app => app.status === "pending")?.length || 0,
      description: "Applications awaiting review",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
        </svg>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome to the Mtendere Education Consult admin panel</p>
          </div>
          <Button 
            onClick={handleUpdateSiteData}
            disabled={updateSiteData.isPending}
            className="bg-secondary hover:bg-secondary/90"
          >
            {updateSiteData.isPending ? "Updating..." : "Update Site Data"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest student applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications?.slice(0, 5).map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{application.fullName}</p>
                      <p className="text-sm text-gray-600">{application.university}</p>
                    </div>
                    <span className={`status-badge ${application.status}`}>
                      {application.status}
                    </span>
                  </div>
                )) || (
                  <p className="text-gray-500">No applications yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Website Content</span>
                  <span className="status-badge active">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>User Registration</span>
                  <span className="status-badge active">Open</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Application Submissions</span>
                  <span className="status-badge active">Open</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <span className="status-badge active">Enabled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
