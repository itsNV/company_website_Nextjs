export const SERVICE_BLOCK_PALETTE = [
  {
    type: "hero",
    label: "Hero Header Section",
    icon: "Laptop",
    color: "blue",
    description: "Badge, Service Name, Tagline, Cover Image, and CTA button configuration",
    defaultData: {
      badge: "Capabilities",
      title: "Custom Service Title",
      slug: "",
      description: "High-performance custom solutions built to scale with secure modern infrastructure.",
      ctaText: "Get Started Now",
      ctaLink: "/contact",
      imageUrl: "",
    }
  },
  {
    type: "overview",
    label: "Overview Section",
    icon: "Sparkles",
    color: "cyan",
    description: "Detailed headline and overview paragraph copy",
    defaultData: {
      title: "Core Service Highlights",
      description: "We deliver rapid, secure, and user-centric software solutions tailored specifically to solve enterprise problems."
    }
  },
  {
    type: "benefits",
    label: "Benefits Sidebar / Bullet List",
    icon: "ShieldCheck",
    color: "emerald",
    description: "List of key benefits with customizable bullet checkmarks",
    defaultData: {
      bulletIcon: "CheckCircle2",
      items: [
        "Sub-second page loading speeds",
        "Enterprise-grade security protections",
        "Highly customizable content grids"
      ]
    }
  },
  {
    type: "offerings",
    label: "Capabilities/Services Offered",
    icon: "PlusCircle",
    color: "indigo",
    description: "Dynamic array listing sub-services or offerings",
    defaultData: {
      items: [
        "Headless CMS custom architecture",
        "Custom API backend pipelines",
        "Modular layout engineering"
      ]
    }
  },
  {
    type: "features",
    label: "Features Cards Grid",
    icon: "Award",
    color: "rose",
    description: "Repeatable feature blocks with individual title, desc, and icon selectors",
    defaultData: {
      items: [
        { title: "Scalable Architecture", desc: "Dockerized container systems supporting massive horizontal traffic scales.", icon: "Cpu" },
        { title: "SEO optimization", desc: "Server-side page rendering ensuring indexing passes crawl and rank fast.", icon: "Compass" }
      ]
    }
  },
  {
    type: "process",
    label: "Process Timeline Steps",
    icon: "Compass",
    color: "amber",
    description: "Timeline steps for client lifecycle tracking",
    defaultData: {
      items: [
        { step: "01", title: "Discovery Analysis", desc: "Audit existing business operations and layout requirements." },
        { step: "02", title: "Engineering Phase", desc: "Iterate codebase deployments inside containerized sandboxes." }
      ]
    }
  },
  {
    type: "faqs",
    label: "Accordion FAQs",
    icon: "HelpCircle",
    color: "fuchsia",
    description: "Frequently Asked Questions accordion elements",
    defaultData: {
      items: [
        { q: "What is the expected delivery timeframe?", a: "Most customized software solutions deliver within 6 to 12 weeks depending on scope complexity." }
      ]
    }
  },
  {
    type: "pricing",
    label: "Pricing / Plan Comparison Grids",
    icon: "ShoppingBag",
    color: "violet",
    description: "Plans comparison cards similar to Hostinger pricing tiers",
    defaultData: {
      items: [
        {
          name: "Startup Core",
          price: "Free / Consultation",
          period: "Single Blueprint",
          ctaText: "Schedule Call",
          ctaLink: "/contact",
          features: ["Basic requirements map", "System layout wireframes", "1-week timeline audit"]
        },
        {
          name: "Enterprise Scaled",
          price: "$999",
          period: "Monthly",
          ctaText: "Provision Stack",
          ctaLink: "/contact",
          features: ["Dedicated development cluster", "SLA uptime guarantees", "Continuous CI/CD integration pipelines"]
        }
      ]
    }
  },
  {
    type: "industries",
    label: "Industries Served",
    icon: "Compass",
    color: "slate",
    description: "Industries served checklist configuration",
    defaultData: {
      title: "Industries We Serve",
      description: "Custom database workflows configured specifically for your industry vertical.",
      items: [
        "Manufacturing & Industrial",
        "Textile & Garment",
        "Pharmaceutical & Chemical"
      ]
    }
  },
  {
    type: "seo",
    label: "SEO Meta Parameters & Schema",
    icon: "Shield",
    color: "slate",
    description: "Structured Data Schema JSON, Focus keywords, Meta description, Meta Title",
    defaultData: {
      focusKeyword: "Software engineering, branding strategy",
      metaTitle: "Premium Software Development Services | Yunawise",
      metaDescription: "Yunawise builds enterprise-grade cloud integrations and modern responsive web systems.",
      structuredSchema: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Service\"\n}"
    }
  }
];

export const createPageBlock = (type) => {
  const matching = SERVICE_BLOCK_PALETTE.find((b) => b.type === type);
  if (!matching) return null;

  return {
    id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    type,
    data: JSON.parse(JSON.stringify(matching.defaultData)),
  };
};

export const getDefaultPageBlocks = () => {
  return [
    createPageBlock("hero"),
    createPageBlock("overview"),
    createPageBlock("seo"),
  ].filter(Boolean);
};

// Map blocks layout to legacy payload fields for backward-compatibility
export const blocksToPagePayload = (blocks) => {
  const payload = {
    blocks: blocks.map((b) => ({
      id: b.id,
      type: b.type,
      data: b.data,
    })),
  };

  // Populate legacy fields on document root so existing pages don't break
  const heroBlock = blocks.find((b) => b.type === "hero");
  if (heroBlock) {
    payload.name = heroBlock.data.title || "";
    payload.slug = heroBlock.data.slug || "";
    payload.heroBadge = heroBlock.data.badge || "";
    payload.heroDescription = heroBlock.data.description || "";
    payload.ctaText = heroBlock.data.ctaText || "";
    payload.ctaLink = heroBlock.data.ctaLink || "";
    payload.imageUrl = heroBlock.data.imageUrl || "";
  }

  const overviewBlock = blocks.find((b) => b.type === "overview");
  if (overviewBlock) {
    payload.overviewTitle = overviewBlock.data.title || "";
    payload.overviewDescription = overviewBlock.data.description || "";
  }

  const benefitsBlock = blocks.find((b) => b.type === "benefits");
  if (benefitsBlock) {
    payload.benefits = benefitsBlock.data.items || [];
  }

  const offeringsBlock = blocks.find((b) => b.type === "offerings");
  if (offeringsBlock) {
    payload.servicesOffered = offeringsBlock.data.items || [];
    payload.featuresOffered = offeringsBlock.data.items || []; // copy for solution compatibility
  }

  const featuresBlock = blocks.find((b) => b.type === "features");
  if (featuresBlock) {
    payload.features = featuresBlock.data.items || [];
  }

  const processBlock = blocks.find((b) => b.type === "process");
  if (processBlock) {
    payload.processSteps = processBlock.data.items || [];
  }

  const faqsBlock = blocks.find((b) => b.type === "faqs");
  if (faqsBlock) {
    payload.faqs = faqsBlock.data.items || [];
  }

  const industriesBlock = blocks.find((b) => b.type === "industries");
  if (industriesBlock) {
    payload.industriesServed = industriesBlock.data.items || [];
  }

  const seoBlock = blocks.find((b) => b.type === "seo");
  if (seoBlock) {
    payload.seoTitle = seoBlock.data.metaTitle || "";
    payload.seoDescription = seoBlock.data.metaDescription || "";
    payload.focusKeyword = seoBlock.data.focusKeyword || "";
    payload.structuredSchema = seoBlock.data.structuredSchema || "";
  }

  return payload;
};

// Map legacy payload fields to blocks layout
export const pagePayloadToBlocks = (payload) => {
  if (payload.blocks && payload.blocks.length > 0) {
    return payload.blocks;
  }

  // Generate blocks from legacy flat fields
  const blocks = [];

  blocks.push({
    id: `hero_${Date.now()}_1`,
    type: "hero",
    data: {
      badge: payload.heroBadge || "Capabilities",
      title: payload.name || payload.title || "",
      slug: payload.slug || "",
      description: payload.heroDescription || "",
      ctaText: payload.ctaText || "",
      ctaLink: payload.ctaLink || "",
      imageUrl: payload.imageUrl || "",
    }
  });

  if (payload.overviewDescription) {
    blocks.push({
      id: `overview_${Date.now()}_2`,
      type: "overview",
      data: {
        title: payload.overviewTitle || "",
        description: payload.overviewDescription || ""
      }
    });
  }

  if (payload.benefits && payload.benefits.length > 0) {
    blocks.push({
      id: `benefits_${Date.now()}_3`,
      type: "benefits",
      data: {
        bulletIcon: "CheckCircle2",
        items: payload.benefits
      }
    });
  }

  if ((payload.servicesOffered || payload.featuresOffered) && (payload.servicesOffered || payload.featuresOffered).length > 0) {
    blocks.push({
      id: `offerings_${Date.now()}_4`,
      type: "offerings",
      data: {
        items: payload.servicesOffered || payload.featuresOffered || []
      }
    });
  }

  if (payload.features && payload.features.length > 0) {
    blocks.push({
      id: `features_${Date.now()}_5`,
      type: "features",
      data: {
        items: payload.features
      }
    });
  }

  if (payload.processSteps && payload.processSteps.length > 0) {
    blocks.push({
      id: `process_${Date.now()}_6`,
      type: "process",
      data: {
        items: payload.processSteps
      }
    });
  }

  if (payload.faqs && payload.faqs.length > 0) {
    blocks.push({
      id: `faqs_${Date.now()}_7`,
      type: "faqs",
      data: {
        items: payload.faqs
      }
    });
  }

  if (payload.industriesServed && payload.industriesServed.length > 0) {
    blocks.push({
      id: `industries_${Date.now()}_9`,
      type: "industries",
      data: {
        title: "Industries We Serve",
        description: "Custom database workflows configured specifically for your industry vertical.",
        items: payload.industriesServed
      }
    });
  }

  blocks.push({
    id: `seo_${Date.now()}_8`,
    type: "seo",
    data: {
      focusKeyword: payload.focusKeyword || "",
      metaTitle: payload.seoTitle || "",
      metaDescription: payload.seoDescription || "",
      structuredSchema: payload.structuredSchema || ""
    }
  });

  return blocks;
};

// Handle uploading block image files to Firebase Storage
export const uploadPageBlockImages = async (blocks, storage, uploadBytes, getDownloadURL, ref) => {
  const nextBlocks = [];
  for (const block of blocks) {
    if (block.type === "hero" && block.data?.imageFile) {
      const file = block.data.imageFile;
      const fileRef = ref(storage, `page_builders/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      
      const { imageFile, ...cleanedData } = block.data;
      nextBlocks.push({
        ...block,
        data: {
          ...cleanedData,
          imageUrl,
        }
      });
    } else {
      nextBlocks.push(block);
    }
  }
  return nextBlocks;
};
