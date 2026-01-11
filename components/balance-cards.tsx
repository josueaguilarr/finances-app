"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type BalancesProp = {
  total: number;
  income: number;
  expenses: number;
};

export const BalanceCards = ({ total, income, expenses }: BalancesProp) => {
  const balanceData = [
    {
      title: "Balance Total",
      amount: total,
      change: 0,
      changePercent: 0,
      trend: "up",
      icon: Wallet,
      description: "vs. mes anterior",
    },
    {
      title: "Ingresos",
      amount: income,
      change: 0,
      changePercent: 0,
      trend: "up",
      icon: TrendingUp,
      description: "vs. mes anterior",
    },
    {
      title: "Gastos",
      amount: expenses,
      change: 0,
      changePercent: 0,
      trend: "down",
      icon: TrendingDown,
      description: "vs. mes anterior",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {balanceData.map((item, index) => {
        const Icon = item.icon;
        const isPositive = item.trend === "up";

        return (
          <Card
            key={index}
            className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <CardContent className="px-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <h3 className="mt-2 text-balance text-3xl font-semibold tracking-tight">
                    $
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(item.amount)}
                  </h3>
                  <div className="mt-3 flex items-center gap-2">
                    {isPositive ? (
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        isPositive ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {item.changePercent.toFixed(1)}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({isPositive ? "+" : ""}$
                      {Math.abs(item.change).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      )
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
