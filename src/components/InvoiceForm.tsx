import { useState } from "react";
import { ChevronLeft, Heart, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const InvoiceForm = () => {
  const [showInvoiceInfo, setShowInvoiceInfo] = useState(true);

  // 📝 Form state
  const [entity, setEntity] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [supplier, setSupplier] = useState("");
  const [isSupplierInList, setIsSupplierInList] = useState("Yes");
  const [inquiryType, setInquiryType] = useState("");
  const [description, setDescription] = useState("");

  // 📢 Response popup state
  const [openDialog, setOpenDialog] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // 🚀 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      entity,
      invoice_number: invoiceNumber,
      supplier,
      is_supplier_in_list: isSupplierInList,
      inquiry_type: inquiryType,
      description,
      priority: "3",
    };

    try {
      const res = await fetch(
        "https://s2-p-backend-oiwg.vercel.app/api/submit-invoice-inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      setApiResponse(data);
      setOpenDialog(true);
    } catch (err) {
      setApiResponse({
        success: false,
        message: "Something went wrong. Please try again.",
      });
      setOpenDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-background font-lato">
      <div className="container mx-auto px-6 py-10 max-w-[1100px]">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 text-primary hover:text-primary px-0"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        {/* Layout */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-[1fr_260px] gap-8 items-start">
            {/* LEFT FORM */}
            <Card className="p-8 border border-border bg-card">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl text-foreground">
                  Submit an Invoice Inquiry
                </h1>
                <Heart className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>

              {/* Divider line below title */}
              <div className="border-t border-border mb-6" />

              {/* Required note */}
              <div className="flex items-center gap-2 mb-8">
                <p className="text-sm text-destructive">* </p>
                <p className="text-sm">Indicates required</p>
              </div>

              <div className="space-y-6">
                {/* Entity */}
                <div>
                  <Label className="flex items-center gap-1 text-sm font-medium">
                    <span className="text-destructive">*</span> Entity
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Select onValueChange={setEntity}>
                    <SelectTrigger className="mt-2 h-9 bg-card">
                      <SelectValue placeholder="Select entity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COMPAC SERVICES B.V.">
                        COMPAC SERVICES B.V.
                      </SelectItem>
                      <SelectItem value="Entity 2">Entity 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Invoice Number */}
                <div>
                  <Label className="flex items-center gap-1 text-sm font-medium">
                    Invoice number
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  {showInvoiceInfo && (
                    <div className="mt-2 p-3 bg-muted/40 rounded-md border border-border text-sm flex justify-between">
                      <p className="flex-1">
                        If there are multiple invoice numbers, please use the
                        'Description' field or upload an Excel file containing
                        all the invoice numbers as an attachment.
                      </p>
                      <button
                        onClick={() => setShowInvoiceInfo(false)}
                        type="button"
                        className="ml-2"
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  )}
                  <Input
                    id="invoice"
                    className="mt-2 h-9"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>

                {/* Supplier */}
                <div>
                  <Label className="text-sm font-medium">
                    <span className="text-destructive">*</span> Supplier
                  </Label>
                  <Input
                    id="supplier"
                    className="mt-2 h-9"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                  />
                </div>

                {/* Supplier List */}
                <div>
                  <Label className="text-sm font-medium">
                    <span className="text-destructive">*</span> Is Supplier in
                    the List?
                  </Label>
                  <Select
                    defaultValue="Yes"
                    onValueChange={setIsSupplierInList}
                  >
                    <SelectTrigger className="mt-2 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Inquiry Type */}
                <div>
                  <Label className="flex items-center gap-1 text-sm font-medium">
                    <span className="text-destructive">*</span> Inquiry Type
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Select onValueChange={setInquiryType}>
                    <SelectTrigger className="mt-2 h-9">
                      <SelectValue placeholder="-- None --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Invoice Status Query">
                        Invoice Status Query
                      </SelectItem>
                      <SelectItem value="Type 2">Type 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-sm font-medium">
                    <span className="text-destructive">*</span> Description
                  </Label>
                  <Textarea
                    id="description"
                    className="mt-2 min-h-[160px] resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="border-t border-border mt-12 mb-4" />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      className="flex items-center gap-1 text-sm text-black hover:underline"
                    >
                      📎 Add attachments
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-4">
              <Card className="p-4 rounded-lg">
                <div className="border-b border-border mb-4">
                  <Button
                    type="submit"
                    className="w-full h-6 rounded-lg font-medium bg-[#4F52BD] text-white"
                  >
                    Submit
                  </Button>
                </div>

                <div className="border-t border-border mb-4" />
                <h3 className="font-medium text-sm mb-3 mt-0">
                  Required information
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Entity", "Supplier", "Inquiry Type", "Description"].map(
                    (field) => (
                      <span
                        key={field}
                        className="px-2 py-1 text-xs border border-black text-destructive rounded-md"
                      >
                        {field}
                      </span>
                    )
                  )}
                </div>
              </Card>
            </div>
          </div>
        </form>

        {/* 🟡 Response Popup */}
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {apiResponse?.success ? "✅ Success" : "❌ Error"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {apiResponse?.message}
                {apiResponse?.success && apiResponse.data && (
                  <div className="mt-3 text-sm">
                    <p>
                      <strong>Record Number:</strong>{" "}
                      {apiResponse.data.record_number}
                    </p>
                    <p>
                      <strong>Sys ID:</strong> {apiResponse.data.sys_id}
                    </p>
                    <p>
                      <strong>Created On:</strong> {apiResponse.data.created_on}
                    </p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpenDialog(false)}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default InvoiceForm;
