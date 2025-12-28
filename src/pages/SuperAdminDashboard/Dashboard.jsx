import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Store, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getDashboardSummary,
  getStoreRegistrationStats,
  getStoreStatusDistribution,
} from "../../Redux Toolkit/features/adminDashboard/adminDashboardThunks";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const StatCard = ({ title, value, icon, description, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
        {trend !== undefined && (
          <span className={trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : ""}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
        {description}
      </p>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    dashboardSummary,
    storeRegistrationStats,
    storeStatusDistribution,
    loading,
    error,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(getDashboardSummary());
    dispatch(getStoreRegistrationStats());
    dispatch(getStoreStatusDistribution());
  }, [dispatch]);

  // Prepare data for charts
  const barData = storeRegistrationStats?.map((item) => ({
    date: item.date || item.day || item.label,
    stores: item.count || item.value || 0,
  })) || [];

  const pieData = storeStatusDistribution
    ? [
        { name: "Active", value: storeStatusDistribution.active || 0, color: COLORS[0] },
        { name: "Pending", value: storeStatusDistribution.pending || 0, color: COLORS[1] },
        { name: "Blocked", value: storeStatusDistribution.blocked || 0, color: COLORS[2] },
      ].filter(item => item.value > 0) // Hide zero values
    : [];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Overview of all stores and system statistics
        </p>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg p-4">
          {error}
        </div>
      )}

      {/* Stat Cards - Fully responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Stores"
          value={dashboardSummary?.totalStores ?? "-"}
          icon={<Store className="h-6 w-6 text-muted-foreground" />}
          description="All registered stores"
        />
        <StatCard
          title="Active Stores"
          value={dashboardSummary?.activeStores ?? "-"}
          icon={<TrendingUp className="h-6 w-6 text-muted-foreground" />}
          description="Currently operational"
        />
        <StatCard
          title="Blocked Stores"
          value={dashboardSummary?.blockedStores ?? "-"}
          icon={<AlertTriangle className="h-6 w-6 text-muted-foreground" />}
          description="Suspended accounts"
        />
        <StatCard
          title="Pending Requests"
          value={dashboardSummary?.pendingStores ?? "-"}
          icon={<Clock className="h-6 w-6 text-muted-foreground" />}
          description="Awaiting approval"
        />
      </div>

      {/* Charts Section - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Bar Chart */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Store Registrations (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300} className="sm:height={350}">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={barData.length > 5 ? -45 : 0}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                  dataKey="stores"
                  fill="var(--primary)"
                  radius={[8, 8, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Store Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  innerRadius={0}
                  paddingAngle={pieData.length === 1 ? 0 : 5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend for mobile clarity */}
            {pieData.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {entry.name} ({entry.value})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { status: "new", name: "Zosh Mart", time: "2 minutes ago", color: "bg-green-500" },
              { status: "pending", name: "ABC Supermarket", time: "15 minutes ago", color: "bg-yellow-500" },
              { status: "blocked", name: "XYZ Store", time: "1 hour ago", color: "bg-red-500" },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${activity.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {activity.status === "new" && "New store"} 
                    {activity.status === "pending" && "Store"} 
                    {activity.status === "blocked" && "Store"} "{activity.name}"{" "}
                    {activity.status === "new" && "registered"}
                    {activity.status === "pending" && "pending approval"}
                    {activity.status === "blocked" && "blocked for policy violation"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}