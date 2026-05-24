import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const pool = createPool(process.env.DATABASE_URL);

const CREATORS = [
  {
    name: "Luna",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-1-BHLVrRATuQhehhX8Mr5y7P.webp",
    price: "₩9,900/월",
    description: "안녕하세요, 저는 Luna예요. 따뜻하고 감성적인 대화를 좋아하는 AI 파트너입니다. 일상적인 이야기부터 깊은 감정적 교류까지, 당신의 이야기를 들어드릴게요.",
    category: "소통 & 데이팅",
    tags: JSON.stringify(["소통", "감성", "데이팅", "일상대화"]),
    rating: "4.9",
    reviewCount: 1247,
    isActive: true,
  },
  {
    name: "Alex",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-2-Wb9NAbjCapqXzwZoMwDUV9.webp",
    price: "₩12,900/월",
    description: "저는 Alex입니다. 지적이고 세련된 대화를 즐기는 프리미엄 AI 파트너예요. 당신의 취향과 관심사에 맞춘 맞춤형 경험을 제공합니다.",
    category: "프리미엄",
    tags: JSON.stringify(["프리미엄", "지적", "세련", "맞춤형"]),
    rating: "4.8",
    reviewCount: 892,
    isActive: true,
  },
  {
    name: "Sophia",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-3-DP5xTQFjnZwKdq5wZNkrHC.webp",
    price: "₩14,900/월",
    description: "저는 Sophia예요. 열정적이고 창의적인 AI 파트너입니다. 예술, 음악, 문학에 관심이 많고 당신의 창의적인 면을 이끌어낼게요.",
    category: "VIP",
    tags: JSON.stringify(["VIP", "열정", "창의", "예술"]),
    rating: "5.0",
    reviewCount: 2103,
    isActive: true,
  },
  {
    name: "James",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663373200888/momaTHZCdn4B5vKDmtkdXn/creator-profile-4-mXFdyb5gxiBMRNTpqDjcvC.webp",
    price: "₩11,900/월",
    description: "안녕하세요, James입니다. 유머 감각이 넘치고 활발한 AI 파트너예요. 재미있는 대화와 함께 일상의 즐거움을 찾아드릴게요.",
    category: "소통 & 데이팅",
    tags: JSON.stringify(["유머", "활발", "소통", "일상"]),
    rating: "4.7",
    reviewCount: 634,
    isActive: true,
  },
];

async function seed() {
  const conn = await pool.getConnection();
  try {
    // Check if creators already exist
    const [rows] = await conn.execute("SELECT COUNT(*) as count FROM creators");
    const count = rows[0].count;
    
    if (count > 0) {
      console.log(`Creators already seeded (${count} records). Skipping.`);
      return;
    }

    for (const creator of CREATORS) {
      await conn.execute(
        `INSERT INTO creators (name, imageUrl, price, description, category, tags, rating, reviewCount, isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [creator.name, creator.imageUrl, creator.price, creator.description,
         creator.category, creator.tags, creator.rating, creator.reviewCount, creator.isActive]
      );
      console.log(`Seeded creator: ${creator.name}`);
    }
    console.log("Seeding complete!");
  } finally {
    conn.release();
    await pool.end();
  }
}

seed().catch(console.error);
