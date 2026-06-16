import { DEFAULT_SECTION_EMOJI } from "@/lib/blogEmojis";

export const BLOCK_SIZES = [
  { id: "small", label: "S", width: "50%" },
  { id: "medium", label: "M", width: "66%" },
  { id: "large", label: "L", width: "83%" },
  { id: "full", label: "Full", width: "100%" },
];

export const BLOCK_SIZE_CLASSES = {
  small: "w-1/2",
  medium: "w-2/3",
  large: "w-5/6",
  full: "w-full",
};

export const BLOCK_POSITIONS = [
  { id: "left", label: "Left" },
  { id: "center", label: "Center" },
  { id: "right", label: "Right" },
];

export const BLOCK_POSITION_CLASSES = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

export const BULLET_LIST_STYLES = [
  { id: "check", label: "Checkmarks" },
  { id: "dot", label: "Dots" },
  { id: "number", label: "Numbers" },
  { id: "arrow", label: "Arrows" },
  { id: "star", label: "Stars" },
];

/** @deprecated use pixel sizing */
export const IMAGE_HEIGHT_CLASSES = {
  small: "aspect-[21/9]",
  medium: "aspect-[16/9]",
  large: "aspect-[4/3]",
};

export const BLOG_BLOCK_PALETTE = [
  { type: "header", label: "Header", description: "Title, author, category & excerpt", icon: "FileText", color: "purple" },
  { type: "seo", label: "SEO", description: "Meta title, description, schema & keyphrase", icon: "Search", color: "teal" },
  { type: "coverImage", label: "Cover Image", description: "Hero banner image", icon: "ImageIcon", color: "indigo" },
  { type: "contentSection", label: "Content Section", description: "Emoji title, body, bullets & image", icon: "Layout", color: "violet" },
  { type: "text", label: "Text Block", description: "Paragraph or rich text", icon: "AlignLeft", color: "slate" },
  { type: "image", label: "Image", description: "Standalone image block", icon: "Image", color: "blue" },
  { type: "table", label: "Table", description: "Editable data table", icon: "Table", color: "orange" },
  { type: "bulletList", label: "Bullet List", description: "Multiple list styles", icon: "List", color: "emerald" },
  { type: "twoColumn", label: "Two Columns", description: "Side-by-side comparison", icon: "Columns2", color: "rose" },
  { type: "techStack", label: "Tech Stack", description: "Technologies with icons", icon: "Cpu", color: "cyan" },
  { type: "faq", label: "FAQ", description: "Questions & answers", icon: "HelpCircle", color: "amber" },
  { type: "callout", label: "Callout", description: "Highlighted quote or tip", icon: "Quote", color: "fuchsia" },
  { type: "divider", label: "Divider", description: "Visual spacer line", icon: "Minus", color: "gray" },
];

function uid() {
  return `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getBlockLayoutClasses(block) {
  const width = BLOCK_SIZE_CLASSES[block?.size] || BLOCK_SIZE_CLASSES.full;
  const pos = BLOCK_POSITION_CLASSES[block?.position || "center"];
  return `${width} ${pos}`;
}

export function getImagePixelStyle(data = {}) {
  const style = { objectFit: "cover" };
  if (data.imageWidthPx) style.width = `${Number(data.imageWidthPx)}px`;
  else style.width = "100%";
  if (data.imageHeightPx) style.height = `${Number(data.imageHeightPx)}px`;
  else if (!data.imageHeight) style.maxHeight = "480px";
  return style;
}

export function createBlock(type, overrides = {}) {
  const base = { id: uid(), type, size: "full", position: "center" };

  const defaults = {
    header: {
      data: { title: "", excerpt: "", author: "Yunawise Editor", category: "IT Strategy", slug: "" },
    },
    seo: {
      data: { metaTitle: "", metaDescription: "", focusKeyphrase: "", schema: "" },
    },
    coverImage: {
      data: { imageUrl: "", imageFile: null, imagePreview: "", imageWidthPx: "", imageHeightPx: "" },
    },
    contentSection: {
      data: {
        emoji: DEFAULT_SECTION_EMOJI,
        title: "",
        body: "",
        bulletPoints: [],
        bulletStyle: "check",
        imageUrl: "",
        imageFile: null,
        imagePreview: "",
        imageWidthPx: "",
        imageHeightPx: "",
        imagePosition: "right",
      },
    },
    text: { data: { content: "", align: "left" } },
    image: {
      data: {
        imageUrl: "",
        imageFile: null,
        imagePreview: "",
        caption: "",
        imageWidthPx: "",
        imageHeightPx: "",
        align: "center",
      },
    },
    table: {
      data: {
        title: "",
        headers: ["Column 1", "Column 2", "Column 3"],
        rows: [
          ["", "", ""],
          ["", "", ""],
        ],
      },
    },
    bulletList: {
      data: { title: "", items: [""], listStyle: "check" },
    },
    twoColumn: {
      data: { leftTitle: "The Challenge", leftContent: "", rightTitle: "Our Assessment", rightContent: "" },
    },
    techStack: {
      data: { items: [{ name: "", icon: "Cpu" }] },
    },
    faq: { data: { items: [{ q: "", a: "" }] } },
    callout: { data: { emoji: "💡", title: "", content: "", variant: "purple" } },
    divider: { data: { style: "gradient" } },
  };

  return { ...base, ...(defaults[type] || { data: {} }), ...overrides };
}

export function getDefaultBlocks() {
  return [createBlock("header"), createBlock("seo"), createBlock("coverImage"), createBlock("contentSection")];
}

export function blogToBlocks(blog) {
  if (blog?.blocks?.length) {
    return blog.blocks.map((b) => ({
      ...b,
      position: b.position || "center",
      data: {
        ...b.data,
        imageFile: null,
        imagePreview: b.data?.imageUrl || b.data?.imagePreview || "",
        items: b.data?.items || (b.type === "techStack" && b.data?.tags
          ? b.data.tags.map((t) => ({ name: t, icon: "Cpu" }))
          : b.data?.items),
      },
    }));
  }

  const blocks = [];

  blocks.push(
    createBlock("header", {
      data: {
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        author: blog.author || "Yunawise Editor",
        category: blog.category || "IT Strategy",
        slug: blog.slug || "",
      },
    })
  );

  if (blog.seo || blog.metaTitle) {
    blocks.push(
      createBlock("seo", {
        data: {
          metaTitle: blog.seo?.metaTitle || blog.metaTitle || "",
          metaDescription: blog.seo?.metaDescription || blog.metaDescription || "",
          focusKeyphrase: blog.seo?.focusKeyphrase || blog.focusKeyphrase || "",
          schema: blog.seo?.schema || blog.schema || "",
        },
      })
    );
  }

  if (blog.imageUrl) {
    blocks.push(createBlock("coverImage", { data: { imageUrl: blog.imageUrl, imagePreview: blog.imageUrl } }));
  }

  if (blog.contentSections?.length) {
    blog.contentSections.forEach((s) => {
      blocks.push(
        createBlock("contentSection", {
          data: {
            emoji: s.emoji || DEFAULT_SECTION_EMOJI,
            title: s.title || "",
            body: s.body || "",
            bulletPoints: s.bulletPoints || [],
            imageUrl: s.imageUrl || "",
            imagePreview: s.imageUrl || "",
            imageWidthPx: s.imageWidthPx || "",
            imageHeightPx: s.imageHeightPx || "",
          },
        })
      );
    });
  } else if (blog.problem || blog.solution) {
    blocks.push(
      createBlock("twoColumn", {
        data: {
          leftTitle: "The Core Challenge",
          leftContent: blog.problem || "",
          rightTitle: "Our Assessment",
          rightContent: blog.solution || "",
        },
      })
    );
  }

  if (blog.tech_stack?.length) {
    blocks.push(
      createBlock("techStack", {
        data: { items: blog.tech_stack.map((t) => ({ name: t, icon: "Cpu" })) },
      })
    );
  }

  if (blog.faqs?.length) {
    blocks.push(createBlock("faq", { data: { items: blog.faqs } }));
  }

  return blocks.length ? blocks : getDefaultBlocks();
}

export function blocksToBlogPayload(blocks) {
  const header = blocks.find((b) => b.type === "header");
  const seo = blocks.find((b) => b.type === "seo");
  const cover = blocks.find((b) => b.type === "coverImage");
  const contentSections = blocks
    .filter((b) => b.type === "contentSection")
    .map(({ data }) => ({
      emoji: data.emoji || DEFAULT_SECTION_EMOJI,
      title: data.title || "",
      body: data.body || "",
      bulletPoints: (data.bulletPoints || []).filter(Boolean),
      bulletStyle: data.bulletStyle || "check",
      imageUrl: data.imageUrl || "",
      imageWidthPx: data.imageWidthPx || "",
      imageHeightPx: data.imageHeightPx || "",
      imagePosition: data.imagePosition || "right",
    }));

  const twoCol = blocks.find((b) => b.type === "twoColumn");
  const tech = blocks.find((b) => b.type === "techStack");
  const faqBlock = blocks.find((b) => b.type === "faq");

  const techItems = tech?.data?.items || [];
  const techNames = techItems.length
    ? techItems.map((i) => i.name).filter(Boolean)
    : (tech?.data?.tags || []).filter(Boolean);

  return {
    title: header?.data?.title || "",
    excerpt: header?.data?.excerpt || "",
    author: header?.data?.author || "Yunawise Editor",
    category: header?.data?.category || "IT Strategy",
    slug: header?.data?.slug || "",
    imageUrl: cover?.data?.imageUrl || "",
    contentSections,
    problem: twoCol?.data?.leftContent || "",
    solution: twoCol?.data?.rightContent || "",
    tech_stack: techNames,
    faqs: (faqBlock?.data?.items || []).filter((f) => f.q?.trim()),
    seo: seo
      ? {
          metaTitle: seo.data.metaTitle || "",
          metaDescription: seo.data.metaDescription || "",
          focusKeyphrase: seo.data.focusKeyphrase || "",
          schema: seo.data.schema || "",
        }
      : null,
    metaTitle: seo?.data?.metaTitle || header?.data?.title || "",
    metaDescription: seo?.data?.metaDescription || header?.data?.excerpt || "",
    focusKeyphrase: seo?.data?.focusKeyphrase || "",
    schema: seo?.data?.schema || "",
    blocks: blocks.map(stripBlockForSave),
  };
}

function stripBlockForSave(block) {
  const { imageFile, imagePreview, ...restData } = block.data || {};
  const clean = { ...restData };

  if (block.type === "contentSection") {
    clean.bulletPoints = (clean.bulletPoints || []).filter(Boolean);
  }
  if (block.type === "bulletList") {
    clean.items = (clean.items || []).filter(Boolean);
  }
  if (block.type === "faq") {
    clean.items = (clean.items || []).filter((f) => f.q?.trim());
  }
  if (block.type === "techStack") {
    clean.items = (clean.items || []).filter((i) => i.name?.trim());
  }
  if (block.type === "table") {
    clean.rows = (clean.rows || []).map((row) => row.map((cell) => cell ?? ""));
  }

  return {
    id: block.id,
    type: block.type,
    size: block.size || "full",
    position: block.position || "center",
    data: clean,
  };
}

export async function uploadBlockImages(blocks, storage, uploadBytes, getDownloadURL, refFn) {
  const uploaded = [];

  for (const block of blocks) {
    const data = { ...block.data };

    if (data.imageFile) {
      const path = `blogs/blocks/${Date.now()}_${data.imageFile.name}`;
      const fileRef = refFn(storage, path);
      const snapshot = await uploadBytes(fileRef, data.imageFile);
      data.imageUrl = await getDownloadURL(snapshot.ref);
      delete data.imageFile;
      delete data.imagePreview;
    }

    uploaded.push({ ...block, data });
  }

  return uploaded;
}

export function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
