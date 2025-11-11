import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EventRegistrationFormProps {
  eventTitle: string;
  onClose: () => void;
}

export default function EventRegistrationForm({ eventTitle, onClose }: EventRegistrationFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Roll number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Registration submitted:", { event: eventTitle, ...formData });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Registration Successful!",
      description: `You've been registered for ${eventTitle}`,
    });

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Registration Successful!</h3>
          <p className="text-muted-foreground">
            You've been registered for {eventTitle}. Check your email for confirmation.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-semibold mb-1">Event Registration</h3>
            <p className="text-sm text-muted-foreground">{eventTitle}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-registration-form"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              data-testid="input-reg-name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="rollNo">
              Roll Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="rollNo"
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              placeholder="BSCS-2021-001"
              data-testid="input-reg-rollno"
              className={errors.rollNo ? "border-destructive" : ""}
            />
            {errors.rollNo && (
              <p className="text-sm text-destructive mt-1">{errors.rollNo}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@gcu.edu.pk"
              data-testid="input-reg-email"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+92 300 1234567"
              data-testid="input-reg-phone"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-testid="button-cancel-registration"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              data-testid="button-submit-registration"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
