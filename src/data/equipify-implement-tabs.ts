import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/equipify/${filename}`;
}

export const EQUIPIFY_IMPLEMENT_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "home-dashboard",
    label: "Home & Dashboard",
    description:
      "The home page and post-login dashboard provide an overview of featured products, recent orders, inventory status, and alerts — giving users a single entry point to procurement, inventory, and supplier management without navigating deep into the catalog first.",
    images: [
      {
        src: asset("equipify_home_page.png"),
        alt: "Equipify home page with featured products and navigation.",
        width: 4000,
        height: 3107,
      },
      {
        src: asset("equipify_menu.png"),
        alt: "Equipify navigation menu and dashboard overview.",
        width: 4000,
        height: 3107,
      },
      {
        src: asset("equipify_home_page_scroll.png"),
        alt: "Equipify home page scroll state with product categories.",
        width: 4000,
        height: 3107,
      },
      {
        src: asset("equipify_home_page_bottom.png"),
        alt: "Equipify home page footer and secondary content.",
        width: 4000,
        height: 3107,
      },
    ],
  },
  {
    value: "product-order",
    label: "Product & Order",
    description:
      "Product and order pages let users browse custom industrial tools, niche machinery parts, and specialized safety gear — compare options, add to cart, and complete bulk orders with supplier approval workflows built in.",
    images: [
      {
        src: asset("equipify_product_order_page.png"),
        alt: "Equipify product and order page with industrial supply catalog.",
        width: 4000,
        height: 3108,
      },
      {
        src: asset("equipify_product_specialized_safety.png"),
        alt: "Equipify specialized safety gear product category.",
        width: 4000,
        height: 3107,
      },
      {
        src: asset("equipify_product_cart.png"),
        alt: "Equipify product cart with bulk order details.",
        width: 4000,
        height: 3108,
      },
      {
        src: asset("equipify_cart_success.png"),
        alt: "Equipify order confirmation and cart success screen.",
        width: 4000,
        height: 3107,
      },
    ],
  },
  {
    value: "inventory",
    label: "Inventory Management",
    description:
      "Inventory management provides real-time stock visibility, barcode scanning, discrepancy reporting, and analytics — helping businesses prevent stockouts, reduce overstocking, and maintain accurate records across multiple locations.",
    images: [
      {
        src: asset("equipify_inventory_overview.png"),
        alt: "Equipify inventory management overview dashboard.",
        width: 4000,
        height: 3107,
      },
      {
        src: asset("equipify_inventory_details.png"),
        alt: "Equipify inventory item detail view.",
        width: 4000,
        height: 3107,
      },
      {
        src: asset("equipify_inventory_categories.png"),
        alt: "Equipify inventory categories and stock levels.",
        width: 4000,
        height: 3108,
      },
      {
        src: asset("equipify_inventory_tools.png"),
        alt: "Equipify inventory management tools and scanning.",
        width: 4000,
        height: 3108,
      },
      {
        src: asset("equipify_inventory_analytics.png"),
        alt: "Equipify inventory analytics and historical data.",
        width: 4000,
        height: 3107,
      },
    ],
  },
];
