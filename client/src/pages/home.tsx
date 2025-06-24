import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  FileText, 
  Calendar, 
  Award,
  TrendingUp,
  Clock
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["/api/user/applications"],
  });

  const { data: universities } = useQuery({
    queryKey: ["/api/universities?limit=6"],
  });

  return (
    <div className="min-h-screen bg-neutral-bg">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-3xl text-dark-text mb-2">
            Welcome back, {user?.firstName || 'Student'}!
          </h1>
          <p className="text-gray-600">Track your applications and explore new opportunities</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">My Applications</p>
                  <p className="text-2xl font-bold text-primary">
                    {applicationsLoading ? "..." : applications?.length || 0}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-accent">
                    {applicationsLoading ? "..." : applications?.filter((app: any) => app.status === 'pending').length || 0}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applicationsLoading ? "..." : applications?.filter((app: any) => app.status === 'approved').length || 0}
                  </p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-secondary">94%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" />
                  My Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applicationsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : applications?.length === 0 ? (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No applications yet</p>
                    <Button className="btn-primary">
                      Start Your First Application
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications?.slice(0, 5).map((application: any) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">University Application #{application.id}</p>
                          <p className="text-sm text-gray-500">
                            Submitted {new Date(application.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            application.status === 'approved' 
                              ? 'bg-green-100 text-green-800'
                              : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-primary">
                  <FileText className="mr-2 h-4 w-4" />
                  New Application
                </Button>
                <Button className="w-full btn-outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
                <Button className="w-full btn-outline">
                  <Award className="mr-2 h-4 w-4" />
                  Browse Scholarships
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Universities</CardTitle>
              </CardHeader>
              <CardContent>
                {universities ? (
                  <div className="space-y-3">
                    {universities.slice(0, 3).map((university: any) => (
                      <div key={university.id} className="p-3 border rounded-lg">
                        <p className="font-medium text-sm">{university.name}</p>
                        <p className="text-xs text-gray-500">{university.location}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Loading recommendations...</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
