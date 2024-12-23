import { Suspense } from "react"

import { CategoryPageContainer } from "@/features/categories/components/category-page-container"
import { getCategories } from "@/features/categories/server/db/get-categories"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slug = (await params).slug

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryPageContainer slug={slug} />
      </Suspense>
    </>
  )
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const categories = await getCategories()

  // Add `/new` as an additional static path
  const staticPaths = [{ slug: "new" }]

  // Dynamically add slugs from categories
  const dynamicPaths = categories.map((category) => ({
    slug: category.slug
  }))

  // Combine static and dynamic paths
  return [...staticPaths, ...dynamicPaths]
}
