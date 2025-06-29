import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Application } from "@shared/schema";

export default function AdminApplications() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const updateApplicationMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PUT", `/api/applications/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Application updated",
        description: "Application status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      });
    },
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/applications/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Application deleted",
        description: "Application has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
    },
  });

  const filteredApplications = applications?.filter(app => 
    statusFilter === "all" || app.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Applications</h1>
          <div className="loading-pulse">Loading applications...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Applications</h1>
            <p className="text-gray-600">Manage student applications and admissions</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications?.filter(app => app.status === "pending").length || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications?.filter(app => app.status === "approved").length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
            <CardDescription>
              {filteredApplications?.length || 0} applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>University</th>
                    <th>Program</th>
                    <th>Status</th>
                    <th>Applied</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications?.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <div>
                          <div className="font-medium">{application.fullName}</div>
                          <div className="text-sm text-gray-600">{application.email}</div>
                        </div>
                      </td>
                      <td>{application.university}</td>
                      <td>{application.program}</td>
                      <td>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </td>
                      <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedApplication(application)}
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                  Complete application information
                                </DialogDescription>
                              </DialogHeader>
                              {selectedApplication && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold">Personal Information</h4>
                                      <p><strong>Name:</strong> {selectedApplication.fullName}</p>
                                      <p><strong>Email:</strong> {selectedApplication.email}</p>
                                      <p><strong>Date of Birth:</strong> {selectedApplication.dateOfBirth}</p>
                                      <p><strong>Passport:</strong> {selectedApplication.passportNumber}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">Academic Information</h4>
                                      <p><strong>University:</strong> {selectedApplication.university}</p>
                                      <p><strong>Program:</strong> {selectedApplication.program}</p>
                                      <p><strong>Intake Month:</strong> {selectedApplication.intakeMonth}</p>
                                      <p><strong>Qualification:</strong> {selectedApplication.academicQualification}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold">Personal Details</h4>
                                    <p><strong>Learning Style:</strong> {selectedApplication.learningStyle}</p>
                                    <p><strong>Personality:</strong> {selectedApplication.personalityTraits}</p>
                                    <p><strong>Hobbies:</strong> {selectedApplication.hobbies}</p>
                                    <p><strong>Logic Answer:</strong> {selectedApplication.logicAnswer}</p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold">Program Motivation</h4>
                                    <p>{selectedApplication.programReason}</p>
                                  </div>

                                  <div className="flex space-x-2">
                                    {selectedApplication.cvPath && (
                                      <Button variant="outline" size="sm" asChild>
                                        <a href={`/${selectedApplication.cvPath}`} target="_blank" rel="noopener noreferrer">
                                          View CV
                                        </a>
                                      </Button>
                                    )}
                                    {selectedApplication.transcriptPath && (
                                      <Button variant="outline" size="sm" asChild>
                                        <a href={`/${selectedApplication.transcriptPath}`} target="_blank" rel="noopener noreferrer">
                                          View Transcript
                                        </a>
                                      </Button>
                                    )}
                                  </div>

                                  <div className="flex space-x-2 pt-4">
                                    <Button
                                      onClick={() => updateApplicationMutation.mutate({ 
                                        id: selectedApplication.id, 
                                        status: "approved" 
                                      })}
                                      className="bg-green-600 hover:bg-green-700"
                                      disabled={updateApplicationMutation.isPending}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      onClick={() => updateApplicationMutation.mutate({ 
                                        id: selectedApplication.id, 
                                        status: "rejected" 
                                      })}
                                      variant="destructive"
                                      disabled={updateApplicationMutation.isPending}
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      onClick={() => updateApplicationMutation.mutate({ 
                                        id: selectedApplication.id, 
                                        status: "pending" 
                                      })}
                                      variant="outline"
                                      disabled={updateApplicationMutation.isPending}
                                    >
                                      Mark Pending
                                    </Button>
                                  </div>
                                </div>
                              )}
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
                                <AlertDialogTitle>Delete Application</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this application? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteApplicationMutation.mutate(application.id)}
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
                      <td colSpan={6} className="text-center text-gray-500">
                        No applications found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
