import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Eye, MoreHorizontal, Ban, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import StoreStatusBadge from "./StoreStatusBadge";
import { getAllStores, moderateStore } from "../../../Redux Toolkit/features/store/storeThunks";
import { formatDateTime } from "../../../utils/formateDate";

export default function StoreTable({ onViewDetails, onBlockStore, onActivateStore }) {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(getAllStores(statusFilter === "all" ? undefined : statusFilter));
  }, [dispatch, statusFilter]);

  // Client-side search filter
  const filteredStores = (stores || []).filter((store) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (store.brand || "").toLowerCase().includes(searchLower) ||
      (store.storeAdmin?.fullName || "").toLowerCase().includes(searchLower) ||
      (store.contact?.email || "").toLowerCase().includes(searchLower)
    );
  });

  const displayedStores = searchTerm ? filteredStores : stores || [];

  const handleStatusChange = async (storeId, newStatus) => {
    setUpdatingId(storeId);
    try {
      await dispatch(moderateStore({ storeId, action: newStatus })).unwrap();
    } catch (e) {
      console.error("Failed to update store status:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters - Stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Input
          placeholder="Search by name, owner, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading / Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading stores...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg p-6">
          {error}
        </div>
      )}

      {/* Table - Responsive Wrapper */}
      {!loading && !error && (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            {/* Desktop Table */}
            <div className="hidden md:block border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Update Status</TableHead>
                    <TableHead>Registered On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedStores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell className="font-medium">{store.brand || "-"}</TableCell>
                      <TableCell>{store.storeAdmin?.fullName || "-"}</TableCell>
                      <TableCell>{store.contact?.phone || "-"}</TableCell>
                      <TableCell>{store.contact?.email || "-"}</TableCell>
                      <TableCell>
                        <StoreStatusBadge status={store.status} />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={store.status?.toUpperCase()}
                          onValueChange={(val) => handleStatusChange(store.id, val)}
                          disabled={updatingId === store.id}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                        {updatingId === store.id && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            Updating...
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{formatDateTime(store.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onViewDetails?.(store)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            {store.status === "active" && (
                              <DropdownMenuItem onClick={() => onBlockStore?.(store.id)}>
                                <Ban className="mr-2 h-4 w-4" /> Block Store
                              </DropdownMenuItem>
                            )}
                            {store.status === "blocked" && (
                              <DropdownMenuItem onClick={() => onActivateStore?.(store.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Activate Store
                              </DropdownMenuItem>
                            )}
                            {store.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => onActivateStore?.(store.id)}>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onBlockStore?.(store.id)}>
                                  <Ban className="mr-2 h-4 w-4" /> Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-4 px-4 sm:px-0">
              {displayedStores.map((store) => (
                <div
                  key={store.id}
                  className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{store.brand || "Unnamed Store"}</h4>
                      <p className="text-sm text-muted-foreground">
                        Owner: {store.storeAdmin?.fullName || "-"}
                      </p>
                    </div>
                    <StoreStatusBadge status={store.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{store.contact?.phone || "-"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium truncate">{store.contact?.email || "-"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Registered:</span>
                      <p className="font-medium">{formatDateTime(store.createdAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status Update:</span>
                      <div className="mt-1">
                        <Select
                          value={store.status?.toUpperCase()}
                          onValueChange={(val) => handleStatusChange(store.id, val)}
                          disabled={updatingId === store.id}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails?.(store)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {store.status === "active" && (
                          <DropdownMenuItem onClick={() => onBlockStore?.(store.id)}>
                            <Ban className="mr-2 h-4 w-4" /> Block Store
                          </DropdownMenuItem>
                        )}
                        {store.status === "blocked" && (
                          <DropdownMenuItem onClick={() => onActivateStore?.(store.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" /> Activate
                          </DropdownMenuItem>
                        )}
                        {store.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => onActivateStore?.(store.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onBlockStore?.(store.id)}>
                              <Ban className="mr-2 h-4 w-4" /> Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && displayedStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchTerm || statusFilter !== "all"
              ? "No stores found matching your filters."
              : "No stores available yet."}
          </p>
        </div>
      )}
    </div>
  );
}