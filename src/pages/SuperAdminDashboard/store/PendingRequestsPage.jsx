// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { CheckCircle, XCircle, Eye, Clock } from "lucide-react";

// import { useToast } from "@/components/ui/use-toast";
// import { getAllStores, moderateStore } from "@/Redux Toolkit/features/store/storeThunks";
// import { formatDateTime } from "@/utils/formateDate";

// export default function PendingRequestsPage() {
//   const dispatch = useDispatch();
//   const { stores, loading, error } = useSelector((state) => state.store);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
//   const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [updatingId, setUpdatingId] = useState(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     dispatch(getAllStores("PENDING"));
//   }, [dispatch]);

//   const handleApprove = (store) => {
//     setSelectedRequest(store);
//     setApprovalDialogOpen(true);
//   };

//   const handleReject = (store) => {
//     setSelectedRequest(store);
//     setRejectionDialogOpen(true);
//   };

//   const confirmApprove = async () => {
//     if (selectedRequest) {
//       setUpdatingId(selectedRequest.id);
//       try {
//         await dispatch(moderateStore({ storeId: selectedRequest.id, action: "ACTIVE" })).unwrap();
//         toast({
//           title: "Store Approved",
//           description: `${selectedRequest.brand} has been approved successfully.`,
//         });
//       } catch (e) {
//         toast({
//           title: "Approval Failed",
//           description: e?.message || "Failed to approve store.",
//           variant: "destructive",
//         });
//       } finally {
//         setApprovalDialogOpen(false);
//         setSelectedRequest(null);
//         setUpdatingId(null);
//       }
//     }
//   };

//   const confirmReject = async () => {
//     if (selectedRequest && rejectionReason.trim()) {
//       setUpdatingId(selectedRequest.id);
//       try {
//         await dispatch(moderateStore({ storeId: selectedRequest.id, action: "BLOCKED" })).unwrap();
//         toast({
//           title: "Store Rejected",
//           description: `${selectedRequest.brand} has been rejected.`,
//         });
//       } catch (e) {
//         toast({
//           title: "Rejection Failed",
//           description: e?.message || "Failed to reject store.",
//           variant: "destructive",
//         });
//       } finally {
//         setRejectionDialogOpen(false);
//         setSelectedRequest(null);
//         setRejectionReason("");
//         setUpdatingId(null);
//       }
//     }
//   };



//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Pending Requests</h2>
//           <p className="text-muted-foreground">
//             Review and approve new store registration requests
//           </p>
//         </div>
//         <Badge variant="secondary" className="flex items-center gap-1">
//           <Clock className="w-3 h-3" />
//           {stores.length} Pending
//         </Badge>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Store Registration Requests</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="border rounded-lg">
//             {loading ? (
//               <div className="text-center py-8">Loading pending requests...</div>
//             ) : error ? (
//               <div className="text-center py-8 text-red-500">{error}</div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Store Name</TableHead>
//                     <TableHead>Owner</TableHead>
//                     <TableHead>Contact</TableHead>
//                     <TableHead>Business Type</TableHead>
//                     <TableHead>Submitted On</TableHead>
                   
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {stores.map((store) => (
//                     <TableRow key={store.id}>
//                       <TableCell className="font-medium">{store.brand}</TableCell>
//                       <TableCell>{store.storeAdmin?.fullName}</TableCell>
//                       <TableCell>
//                         <div className="text-sm">
//                           <div>{store.contact?.phone}</div>
//                           <div className="text-muted-foreground">{store.contact?.email}</div>
//                         </div>
//                       </TableCell>
//                       <TableCell>{store.storeType || "-"}</TableCell>
//                       <TableCell>{formatDateTime(store.createdAt)}</TableCell>
                 
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end gap-2">
                          
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleApprove(store)}
//                             className="text-green-600 border-green-200 hover:bg-green-50"
//                             disabled={updatingId === store.id}
//                           >
//                             <CheckCircle className="w-4 h-4 mr-1" />
//                             {updatingId === store.id ? "Approving..." : "Approve"}
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleReject(store)}
//                             className="text-red-600 border-red-200 hover:bg-red-50"
//                             disabled={updatingId === store.id}
//                           >
//                             <XCircle className="w-4 h-4 mr-1" />
//                             {updatingId === store.id ? "Rejecting..." : "Reject"}
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </div>

//           {stores.length === 0 && !loading && !error && (
//             <div className="text-center py-8 text-muted-foreground">
//               No pending requests at the moment.
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Approval Confirmation Dialog */}
//       <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Approve Store Registration</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to approve {selectedRequest?.brand}? This will activate their account and allow them to start using the platform.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setApprovalDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={confirmApprove} className="bg-green-600 hover:bg-green-700">
//               <CheckCircle className="w-4 h-4 mr-2" />
//               Approve Store
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Rejection Dialog */}
//       <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Reject Store Registration</DialogTitle>
//             <DialogDescription>
//               Please provide a reason for rejecting {selectedRequest?.brand}. This will be communicated to the store owner.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Textarea
//               placeholder="Enter rejection reason..."
//               value={rejectionReason}
//               onChange={(e) => setRejectionReason(e.target.value)}
//               rows={3}
//             />
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={confirmReject}
//               className="bg-red-600 hover:bg-red-700"
//               disabled={!rejectionReason.trim()}
//             >
//               <XCircle className="w-4 h-4 mr-2" />
//               Reject Store
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// } 

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, User, Phone, Mail, Store } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getAllStores, moderateStore } from "@/Redux Toolkit/features/store/storeThunks";
import { formatDateTime } from "@/utils/formateDate";

export default function PendingRequestsPage() {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getAllStores("PENDING"));
  }, [dispatch]);

  const handleApprove = (store) => {
    setSelectedRequest(store);
    setApprovalDialogOpen(true);
  };

  const handleReject = (store) => {
    setSelectedRequest(store);
    setRejectionDialogOpen(true);
  };

  const confirmApprove = async () => {
    if (!selectedRequest) return;
    setUpdatingId(selectedRequest.id);
    try {
      await dispatch(moderateStore({ storeId: selectedRequest.id, action: "ACTIVE" })).unwrap();
      toast({
        title: "Approved",
        description: `${selectedRequest.brand} has been approved successfully.`,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: e?.message || "Something went wrong.",
      });
    } finally {
      setApprovalDialogOpen(false);
      setSelectedRequest(null);
      setUpdatingId(null);
    }
  };

  const confirmReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) return;
    setUpdatingId(selectedRequest.id);
    try {
      await dispatch(moderateStore({ storeId: selectedRequest.id, action: "BLOCKED" })).unwrap();
      toast({
        title: "Rejected",
        description: `${selectedRequest.brand} has been rejected.`,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Rejection Failed",
        description: e?.message || "Something went wrong.",
      });
    } finally {
      setRejectionDialogOpen(false);
      setSelectedRequest(null);
      setRejectionReason("");
      setUpdatingId(null);
    }
  };

  const pendingCount = stores?.length || 0;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Pending Requests
            </h2>
            <p className="text-muted-foreground mt-2">
              Review and manage new store registration requests
            </p>
          </div>
          <Badge variant="secondary" className="w-fit text-lg py-2 px-4">
            <Clock className="w-5 h-5 mr-2" />
            {pendingCount} Pending
          </Badge>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading pending requests...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive">
            <CardContent className="py-8 text-center text-destructive">
              {error}
            </CardContent>
          </Card>
        )}

        {/* Desktop Table View (lg and up) */}
        {!loading && !error && (
          <div className="hidden lg:block">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Store Registration Requests</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {stores.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No pending requests at the moment.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Store Name</th>
                          <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Owner</th>
                          <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Business Type</th>
                          <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Submitted On</th>
                          <th className="px-6 py-4 text-right text-sm font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {stores.map((store) => (
                          <tr key={store.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-5 font-medium">{store.brand}</td>
                            <td className="px-6 py-5">{store.storeAdmin?.fullName || "-"}</td>
                            <td className="px-6 py-5 text-sm">
                              <div>{store.contact?.phone || "-"}</div>
                              <div className="text-muted-foreground">{store.contact?.email || "-"}</div>
                            </td>
                            <td className="px-6 py-5">{store.storeType || "-"}</td>
                            <td className="px-6 py-5 text-sm">{formatDateTime(store.createdAt)}</td>
                            <td className="px-6 py-5 text-right">
                              <div className="flex justify-end gap-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApprove(store)}
                                  disabled={updatingId === store.id}
                                  className="border-green-300 text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1.5" />
                                  {updatingId === store.id ? "Approving..." : "Approve"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReject(store)}
                                  disabled={updatingId === store.id}
                                  className="border-red-300 text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-1.5" />
                                  {updatingId === store.id ? "Rejecting..." : "Reject"}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mobile Card View (below lg) */}
        {!loading && !error && (
          <div className="block lg:hidden space-y-4">
            {stores.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
                  <p className="text-lg font-medium text-muted-foreground">
                    No pending requests at the moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              stores.map((store) => (
                <Card key={store.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Store className="w-5 h-5 text-primary" />
                          {store.brand}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Submitted {formatDateTime(store.createdAt)}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" /> Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Owner:</span>
                        <span>{store.storeAdmin?.fullName || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Phone:</span>
                        <span>{store.contact?.phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                        <span className="truncate">{store.contact?.email || "N/A"}</span>
                      </div>
                      {store.storeType && (
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Type:</span>
                          <span>{store.storeType}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(store)}
                        disabled={updatingId === store.id}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {updatingId === store.id ? "Approving..." : "Approve"}
                      </Button>
                      <Button
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => handleReject(store)}
                        disabled={updatingId === store.id}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        {updatingId === store.id ? "Rejecting..." : "Reject"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Approval Dialog */}
        <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Approve Store Registration
              </DialogTitle>
              <DialogDescription className="pt-2">
                Are you sure you want to approve <strong>{selectedRequest?.brand}</strong>?
                This will activate their account and allow them to use the platform.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setApprovalDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmApprove} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Approval
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rejection Dialog */}
        <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                Reject Store Registration
              </DialogTitle>
              <DialogDescription className="pt-2">
                Please provide a reason for rejecting <strong>{selectedRequest?.brand}</strong>.
                This will be shared with the store owner.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            <DialogFooter className="flex gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={confirmReject}
                disabled={!rejectionReason.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Store
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}