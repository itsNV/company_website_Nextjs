export const PROJECT_BLOCK_PALETTE = [
  {
    type: "challenge",
    label: "Phase 1: The Challenge",
    icon: "HelpCircle",
    color: "rose",
    description: "Problem identification description and optional illustration image",
    defaultData: {
      title: "Problem Identification",
      problem: "Identifying and defining core operational issues and engineering requirements.",
      challenge_image_url: "",
      image_position: "right",
    }
  },
  {
    type: "solution",
    label: "Phase 2: Our Solution",
    icon: "Cpu",
    color: "purple",
    description: "Targeted engineering response description and optional diagram image",
    defaultData: {
      title: "Engineering Response",
      solution: "Developing and deploying targeted, high-performance programmatic answers.",
      solution_image_url: "",
      image_position: "left",
    }
  },
  {
    type: "business_impact",
    label: "Phase 3: Business Impact",
    icon: "Sparkles",
    color: "emerald",
    description: "Measurable corporate value, metrics, and optional impact image",
    defaultData: {
      title: "Delivering Measurable Value",
      business_impact: "Measurable corporate outcome engineered directly through smart architecture integration.",
      business_impact_image_url: "",
      image_position: "right",
    }
  }
];

export const createProjectBlock = (type) => {
  const matching = PROJECT_BLOCK_PALETTE.find((b) => b.type === type);
  if (!matching) return null;

  return {
    id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    type,
    data: JSON.parse(JSON.stringify(matching.defaultData)),
  };
};

export const getDefaultProjectBlocks = () => {
  return [
    createProjectBlock("challenge"),
    createProjectBlock("solution"),
    createProjectBlock("business_impact"),
  ].filter(Boolean);
};

// Map blocks layout to legacy payload fields for backward-compatibility
export const blocksToProjectPayload = (blocks) => {
  const payload = {
    blocks: blocks.map((b) => ({
      id: b.id,
      type: b.type,
      data: b.data,
    })),
  };

  // Sync to legacy flat fields on root for first occurrences to keep card grids working
  const firstChallenge = blocks.find((b) => b.type === "challenge");
  if (firstChallenge) {
    payload.problem = firstChallenge.data.problem || "";
    payload.challenge_image_url = firstChallenge.data.challenge_image_url || "";
  }

  const firstSolution = blocks.find((b) => b.type === "solution");
  if (firstSolution) {
    payload.solution = firstSolution.data.solution || "";
    payload.solution_image_url = firstSolution.data.solution_image_url || "";
  }

  const firstImpact = blocks.find((b) => b.type === "business_impact");
  if (firstImpact) {
    payload.business_impact = firstImpact.data.business_impact || "";
    payload.business_impact_image_url = firstImpact.data.business_impact_image_url || "";
  }

  return payload;
};

// Map legacy payload fields to blocks layout
export const projectPayloadToBlocks = (payload) => {
  if (payload.blocks && payload.blocks.length > 0) {
    // Ensure every loaded block has the title and image_position fields if they are legacy blocks
    return payload.blocks.map((block) => {
      const defaultBlock = PROJECT_BLOCK_PALETTE.find((p) => p.type === block.type);
      return {
        ...block,
        data: {
          title: defaultBlock?.defaultData.title || "",
          image_position: defaultBlock?.defaultData.image_position || "right",
          ...block.data
        }
      };
    });
  }

  // Generate blocks from legacy flat fields
  const blocks = [];

  if (payload.problem) {
    blocks.push({
      id: `challenge_${Date.now()}_1`,
      type: "challenge",
      data: {
        title: "Problem Identification",
        problem: payload.problem,
        challenge_image_url: payload.challenge_image_url || "",
        image_position: "right"
      }
    });
  }

  if (payload.solution) {
    blocks.push({
      id: `solution_${Date.now()}_2`,
      type: "solution",
      data: {
        title: "Engineering Response",
        solution: payload.solution,
        solution_image_url: payload.solution_image_url || "",
        image_position: "left"
      }
    });
  }

  if (payload.business_impact) {
    blocks.push({
      id: `business_impact_${Date.now()}_3`,
      type: "business_impact",
      data: {
        title: "Delivering Measurable Value",
        business_impact: payload.business_impact,
        business_impact_image_url: payload.business_impact_image_url || "",
        image_position: "right"
      }
    });
  }

  return blocks;
};

// Handle uploading block image files to Firebase Storage
export const uploadProjectBlockImages = async (blocks, storage, uploadBytes, getDownloadURL, ref) => {
  const nextBlocks = [];
  for (const block of blocks) {
    if (block.data?.imageFile) {
      const file = block.data.imageFile;
      const fileRef = ref(storage, `project_builders/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      const { imageFile, ...cleanedData } = block.data;
      
      // Map back to corresponding image URL field name based on type
      let imgUrlField = "challenge_image_url";
      if (block.type === "solution") imgUrlField = "solution_image_url";
      if (block.type === "business_impact") imgUrlField = "business_impact_image_url";

      nextBlocks.push({
        ...block,
        data: {
          ...cleanedData,
          [imgUrlField]: url,
        }
      });
    } else {
      nextBlocks.push(block);
    }
  }
  return nextBlocks;
};
