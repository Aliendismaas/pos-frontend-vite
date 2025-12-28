import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddPlanDialog from "./AddPlanDialog";
import EditPlanDialog from "./EditPlanDialog";
import {
  getAllSubscriptionPlans,
  deleteSubscriptionPlan,
  updateSubscriptionPlan,
} from "@/Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

const FEATURE_FLAGS = [
  { key: "advancedReports", label: "Advanced Reports", icon: "📊" },
  { key: "inventory", label: "Inventory System", icon: "📦" },
  { key: "integrations", label: "Third-party Integrations", icon: "🔗" },
  { key: "ecommerce", label: "eCommerce Features", icon: "🛒" },
  { key: "invoiceBranding", label: "Custom Invoice Branding", icon: "🧾" },
  { key: "prioritySupport", label: "Priority Support", icon: "🎧" },
  { key: "multiLocation", label: "Multi-location Support", icon: "📍" },
];

function getFeatureIcons(plan) {
  return FEATURE_FLAGS.filter((f) => plan[f.key]).map((f) => ({
    icon: f.icon,
    label: f.label,
  }));
}

const SubscriptionPlansPage = () => {
  const dispatch = useDispatch();
  const { plans, error } = useSelector((state) => state.subscriptionPlan);

  const [search, setSearch] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
  }, [dispatch]);

  const filteredPlans = useMemo(() => {
    if (!search) return plans || [];
    return (plans || []).filter((plan) =>
      plan.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [plans, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    const res = await dispatch(deleteSubscriptionPlan(id));
    if (res.meta.requestStatus === "fulfilled") {
      toast({ title: "Success", description: "Plan deleted successfully" });
    } else {
      toast({ variant: "destructive", title: "Error", description: res.payload || "Failed to delete plan" });
    }
  };

  const handleStatusToggle = async (plan) => {
    setStatusLoadingId(plan.id);
    const updated = { ...plan, active: !plan.active };
    delete updated.createdAt;
    delete updated.updatedAt;

    const res = await dispatch(updateSubscriptionPlan({ id: plan.id, plan: updated }));
    setStatusLoadingId(null);

    if (res.meta.requestStatus === "fulfilled") {
      toast({ title: "Updated", description: `Plan is now ${updated.active ? "Active" : "Inactive"}` });
    } else {
      toast({ variant: "destructive", title: "Error", description: "Failed to update status" });
    }
  };

  const openEditDialog = (plan) => {
    setSelectedPlan(plan);
    setEditDialogOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-950 p-4 sm:p-6 lg:p-8">
        <AddPlanDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onSuccess={() => dispatch(getAllSubscriptionPlans())}
        />
        <EditPlanDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          plan={selectedPlan}
          onSuccess={() => {
            setEditDialogOpen(false);
            setSelectedPlan(null);
            dispatch(getAllSubscriptionPlans());
          }}
        />

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Subscription Plans
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage pricing tiers and features for your stores
              </p>
            </div>
            <Button
              onClick={() => setAddDialogOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Plan
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search plans by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full max-w-md"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-xl border bg-card shadow-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Branches</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 text-muted-foreground">
                        <span className="text-5xl">📋</span>
                        <p className="text-lg">No subscription plans found</p>
                        {search && <p className="text-sm">Try adjusting your search</p>}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlans.map((plan) => {
                    const features = getFeatureIcons(plan);
                    return (
                      <TableRow key={plan.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-semibold">{plan.name}</TableCell>
                        <TableCell className="font-bold text-emerald-600 dark:text-emerald-400">
                          TZS {plan.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{plan.billingCycle}</Badge>
                        </TableCell>
                        <TableCell>{plan.maxBranches ?? "Unlimited"}</TableCell>
                        <TableCell>{plan.maxUsers ?? "Unlimited"}</TableCell>
                        <TableCell>{plan.maxProducts ?? "Unlimited"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={plan.active}
                              onCheckedChange={() => handleStatusToggle(plan)}
                              disabled={statusLoadingId === plan.id}
                            />
                            <span className={`font-medium ${plan.active ? "text-green-600" : "text-red-600"}`}>
                              {plan.active ? "Active" : "Inactive"}
                            </span>
                            {statusLoadingId === plan.id && (
                              <span className="text-xs text-muted-foreground animate-pulse">saving...</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 flex-wrap">
                            {features.map((f, i) => (
                              <Tooltip key={i}>
                                <TooltipTrigger>
                                  <span className="text-xl">{f.icon}</span>
                                </TooltipTrigger>
                                <TooltipContent>{f.label}</TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditDialog(plan)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(plan.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredPlans.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <span className="text-6xl mb-4 block">📋</span>
                  <p className="text-lg font-medium text-muted-foreground">No plans found</p>
                  {search && <p className="text-sm mt-2">Try a different search term</p>}
                </CardContent>
              </Card>
            ) : (
              filteredPlans.map((plan) => {
                const features = getFeatureIcons(plan);
                return (
                  <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <p className="text-2xl font-bold text-emerald-600 mt-2">
                            TZS {plan.price.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                              /{plan.billingCycle.toLowerCase()}
                            </span>
                          </p>
                        </div>
                        <Badge variant={plan.active ? "default" : "secondary"}>
                          {plan.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Branches</p>
                          <p className="font-semibold">{plan.maxBranches ?? "Unlimited"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Users</p>
                          <p className="font-semibold">{plan.maxUsers ?? "Unlimited"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Products</p>
                          <p className="font-semibold">{plan.maxProducts ?? "Unlimited"}</p>
                        </div>
                      </div>

                      {features.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Key Features</p>
                          <div className="flex flex-wrap gap-3">
                            {features.map((f, i) => (
                              <Tooltip key={i}>
                                <TooltipTrigger>
                                  <span className="text-2xl">{f.icon}</span>
                                </TooltipTrigger>
                                <TooltipContent>{f.label}</TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={plan.active}
                            onCheckedChange={() => handleStatusToggle(plan)}
                            disabled={statusLoadingId === plan.id}
                          />
                          <span className="text-sm">
                            {statusLoadingId === plan.id ? "Saving..." : "Status"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => openEditDialog(plan)}>
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(plan.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Error State */}
          {error && (
            <Card className="border-destructive">
              <CardContent className="pt-6 text-destructive flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <span>{error}</span>
              </CardContent>
            </Card>
          )}

          {/* Footer Stats */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            Showing <strong>{filteredPlans.length}</strong> of <strong>{plans?.length || 0}</strong> plans
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SubscriptionPlansPage;