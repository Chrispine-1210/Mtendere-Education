import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    university: "",
    intakeMonth: "",
    program: "",
    fullName: "",
    email: "",
    passportNumber: "",
    dateOfBirth: "",
    academicQualification: "",
    programReason: "",
    learningStyle: "",
    personalityTraits: "",
    logicAnswer: "",
    hobbies: "",
  });
  const [files, setFiles] = useState<{ cv?: File; transcript?: File }>({});

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitApplicationMutation = useMutation({
    mutationFn: async () => {
      const formSubmitData = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formSubmitData.append(key, value);
      });

      // Add files
      if (files.cv) {
        formSubmitData.append("cv", files.cv);
      }
      if (files.transcript) {
        formSubmitData.append("transcript", files.transcript);
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formSubmitData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully. We will contact you soon!",
      });
      onClose();
      resetForm();
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      university: "",
      intakeMonth: "",
      program: "",
      fullName: "",
      email: "",
      passportNumber: "",
      dateOfBirth: "",
      academicQualification: "",
      programReason: "",
      learningStyle: "",
      personalityTraits: "",
      logicAnswer: "",
      hobbies: "",
    });
    setFiles({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplicationMutation.mutate();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: "cv" | "transcript", file: File | undefined) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Apply to Partner Universities</DialogTitle>
          <DialogDescription>
            Complete this application to apply to our partner universities
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="university">Select University *</Label>
              <Select value={formData.university} onValueChange={(value) => handleInputChange("university", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Choose a University --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chandigarh">Chandigarh University</SelectItem>
                  <SelectItem value="parul">Parul University</SelectItem>
                  <SelectItem value="ct">CT University</SelectItem>
                  <SelectItem value="shoolini">Shoolini University</SelectItem>
                  <SelectItem value="jain">Jain University</SelectItem>
                  <SelectItem value="pcte">PCTE Group of Institutes</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="intakeMonth">Intake Month *</Label>
              <Select value={formData.intakeMonth} onValueChange={(value) => handleInputChange("intakeMonth", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Choose Intake Month --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="program">Program *</Label>
            <Select value={formData.program} onValueChange={(value) => handleInputChange("program", value)}>
              <SelectTrigger>
                <SelectValue placeholder="-- Choose Program --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bsc-cs">BSc in Computer Science</SelectItem>
                <SelectItem value="bsc-nursing">BSc in Nursing</SelectItem>
                <SelectItem value="bsc-it">BSc in Information Technology</SelectItem>
                <SelectItem value="bsc-cyber">BSc in Cybersecurity</SelectItem>
                <SelectItem value="bsc-business">BSc in Business Administration</SelectItem>
                <SelectItem value="bsc-finance">BSc in Finance</SelectItem>
                <SelectItem value="bsc-marketing">BSc in Marketing</SelectItem>
                <SelectItem value="bsc-engineering">BSc in Engineering</SelectItem>
                <SelectItem value="bsc-law">BSc in Law</SelectItem>
                <SelectItem value="bsc-medicine">BSc in Medicine</SelectItem>
                <SelectItem value="bsc-architecture">BSc in Architecture</SelectItem>
                <SelectItem value="master-cs">Master in Computer Science</SelectItem>
                <SelectItem value="master-business">Master in Business Administration</SelectItem>
                <SelectItem value="phd-cs">PhD in Computer Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="passportNumber">Passport Number *</Label>
              <Input
                id="passportNumber"
                value={formData.passportNumber}
                onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="academicQualification">Latest Academic Qualification *</Label>
            <Input
              id="academicQualification"
              value={formData.academicQualification}
              onChange={(e) => handleInputChange("academicQualification", e.target.value)}
              placeholder="e.g., High School Diploma, Bachelor's Degree"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cv">Upload CV (PDF, DOCX only) *</Label>
              <Input
                id="cv"
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => handleFileChange("cv", e.target.files?.[0])}
                required
              />
            </div>

            <div>
              <Label htmlFor="transcript">Upload Academic Transcript (PDF, JPG, PNG only) *</Label>
              <Input
                id="transcript"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("transcript", e.target.files?.[0])}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="programReason">Why are you choosing this program? *</Label>
            <Textarea
              id="programReason"
              value={formData.programReason}
              onChange={(e) => handleInputChange("programReason", e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="learningStyle">Preferred Learning Style *</Label>
              <Select value={formData.learningStyle} onValueChange={(value) => handleInputChange("learningStyle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select Style --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="personalityTraits">Personality Traits *</Label>
              <Select value={formData.personalityTraits} onValueChange={(value) => handleInputChange("personalityTraits", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select One --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="focused">Focused</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="analytical">Analytical</SelectItem>
                  <SelectItem value="team-player">Team Player</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="logicAnswer">Quick Logic Challenge: What comes next? 2, 4, 8, 16, ___ *</Label>
            <Input
              id="logicAnswer"
              type="number"
              value={formData.logicAnswer}
              onChange={(e) => handleInputChange("logicAnswer", e.target.value)}
              placeholder="Enter the next number in the sequence"
              required
            />
          </div>

          <div>
            <Label htmlFor="hobbies">Hobbies and Interests *</Label>
            <Input
              id="hobbies"
              value={formData.hobbies}
              onChange={(e) => handleInputChange("hobbies", e.target.value)}
              placeholder="e.g., Reading, Sports, Music, Technology"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={submitApplicationMutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {submitApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
