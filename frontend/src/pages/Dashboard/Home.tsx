// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
// import ChartTotalArticle from "../../components/WhatsnewasiaDash/ChartTotalArticle";
import FirstSection from "../../components/WhatsnewasiaDash/FirstSection";
import PinnedArticles from "../../components/WhatsnewasiaDash/PinnedArticles";
import TrendingArticleTable from "../../components/WhatsnewasiaDash/TrendingArticleTable";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Whats New Asia - Admin Dashboard"
        description="Whats New Asia - Admin Dashboard"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <FirstSection />
        </div>

        <div className="col-span-12">
          <PinnedArticles />
        </div>

        <div className="col-span-12">
          <TrendingArticleTable />
        </div>

        <div className="col-span-5">
          {/* <ChartTotalArticle /> */}
        </div>

      </div>
    </>
  );
}
