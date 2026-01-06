import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, Shield, MapPin, Clock, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([
    { id: 1, name: "Parent/Guardian", number: "", category: "Personal", isEditable: true },
    { id: 2, name: "School Emergency", number: "", category: "Personal", isEditable: true },
  ]);

  const predefinedContacts = [
    // { name: "National Disaster Management Authority", number: "1078", category: "National", description: "24x7 Emergency Helpline" },
    // { name: "Police Emergency", number: "100", category: "Emergency", description: "Immediate police assistance" },
    // { name: "Fire Department", number: "101", category: "Emergency", description: "Fire emergency services" },
    // { name: "Ambulance Service", number: "108", category: "Medical", description: "Medical emergency services" },
    { name: "Child Helpline", number: "1098", category: "Special", description: "Children in distress" },
    // { name: "Women Helpline", number: "1091", category: "Special", description: "Women in distress" }
  ];

  const handleAddContact = () => {
    const newContact = {
      id: Date.now(),
      name: "",
      number: "",
      category: "Personal",
      isEditable: true
    };
    setContacts([...contacts, newContact]);
  };

  const handleUpdateContact = (id: number, field: string, value: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleEmergencyAlert = () => {
    toast({
      title: "🚨 Emergency Alert Sent!",
      description: "All emergency contacts have been notified of your location and status.",
      duration: 5000,
    });
  };

  const handleCallEmergency = (number: string, name: string) => {
    toast({
      title: `📞 Calling ${name}`,
      description: `Dialing ${number}...`,
      duration: 3000,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Emergency": return "destructive";
      case "Medical": return "success";
      case "National": return "default";
      case "Special": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 via-white to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Phone className="h-16 w-16 mx-auto mb-6 opacity-90 animate-pulse-glow text-blue-800" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-800">
              Contacts
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto text-blue-700">
              Quick access to emergency services and personal contacts for immediate assistance
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Alert Button */}
        <Card className="mb-8 bg-gradient-to-r from-destructive/10 to-fire/10 border-destructive/30">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-2xl font-bold mb-4">Emergency Alert System</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              In case of immediate danger, press the button below to send your location and 
              emergency status to all your registered contacts simultaneously.
            </p>
            <Button 
              variant="emergency" 
              size="lg"
              onClick={handleEmergencyAlert}
              className="animate-pulse-glow"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              SEND EMERGENCY ALERT
            </Button>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Official Emergency Numbers */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              Official Emergency Numbers
            </h2>
            
            <div className="space-y-4">
              {predefinedContacts.map((contact, index) => (
                <Card 
                  key={index}
                  className="hover:shadow-medium transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{contact.name}</h3>
                          <Badge variant={getCategoryColor(contact.category) as any}>
                            {contact.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                        <p className="text-lg font-bold text-primary mt-1">{contact.number}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCallEmergency(contact.number, contact.name)}
                        className="ml-4"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Personal Contacts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Phone className="h-6 w-6 mr-2 text-primary" />
                Personal Contacts
              </h2>
              <Button variant="outline" size="sm" onClick={handleAddContact}>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>

            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <Card 
                  key={contact.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Contact Name</Label>
                        {contact.isEditable && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteContact(contact.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        placeholder="Enter contact name"
                        value={contact.name}
                        onChange={(e) => handleUpdateContact(contact.id, 'name', e.target.value)}
                        disabled={!contact.isEditable}
                      />
                      
                      <div>
                        <Label className="text-sm font-medium">Phone Number</Label>
                        <div className="flex space-x-2 mt-1">
                          <Input
                            placeholder="Enter phone number"
                            value={contact.number}
                            onChange={(e) => handleUpdateContact(contact.id, 'number', e.target.value)}
                            disabled={!contact.isEditable}
                            className="flex-1"
                          />
                          {contact.number && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCallEmergency(contact.number, contact.name)}
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {contacts.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No personal contacts added yet</p>
                  <Button variant="outline" className="mt-4" onClick={handleAddContact}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Contact
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Safety Tips */}
        <Card className="mt-12 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-accent" />
              Emergency Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Before an Emergency:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Keep emergency contacts updated</li>
                  <li>• Know your location (address, landmarks)</li>
                  <li>• Practice emergency procedures regularly</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">During an Emergency:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Stay calm and follow safety protocols</li>
                  <li>• Call appropriate emergency services</li>
                  <li>• Provide clear location information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;