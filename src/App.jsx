import React from "react";
import { algoliasearch }from "algoliasearch";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  ToggleRefinement,
  SortBy,
  Pagination,
  ClearRefinements,
  CurrentRefinements,
  Stats,
  Configure,
} from "react-instantsearch";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

function formatPrice(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function Hit({ hit }) {
  const img = hit.thumbnailImage || hit.image;

  return (
    <a
      href={hit.url}
      target="_blank"
      rel="noreferrer"
      className="group flex gap-4 rounded-2xl border border-blue-200 bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="h-24 w-24 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
        {img ? (
          <img
            src={img}
            alt={hit.name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-xs text-gray-400">No image</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-700">
          {hit.name}
        </div>

        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
          {hit.manufacturer && <span>{hit.manufacturer}</span>}
          {Number.isFinite(hit.customerReviewCount) && (
            <span>{Number(hit.customerReviewCount).toLocaleString()} reviews</span>
          )}
          {Number.isFinite(hit.bestSellingRank) && Number(hit.bestSellingRank) > 0 && (
            <span>Bestseller #{Number(hit.bestSellingRank)}</span>
          )}
          {hit.type && <span className="truncate max-w-[14rem]">{hit.type}</span>}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-indigo-600">
            {formatPrice(hit.salePrice)}
          </span>
          {hit.salePrice_range && (
            <span className="text-xs text-gray-500">{hit.salePrice_range}</span>
          )}
        </div>

        {hit.shortDescription && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {hit.shortDescription}
          </p>
        )}

        {Array.isArray(hit.categories) && hit.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hit.categories.slice(0, 3).map((c) => (
              <span
                key={c}
                className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

function SectionTitle({ children }) {
  return <div className="text-sm font-bold text-gray-900 mb-2">{children}</div>;
}

function Divider() {
  return <div className="my-4 border-t border-gray-200" />;
}

export default function App() {
  const indexName = import.meta.env.VITE_ALGOLIA_INDEX_NAME;
  const priceAsc = import.meta.env.VITE_ALGOLIA_INDEX_PRICE_ASC;
  const priceDesc = import.meta.env.VITE_ALGOLIA_INDEX_PRICE_DESC;

  return (
    <div className="min-h-screen bg-blue-50 text-slate-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight">
                BestBuy Search
              </div>
              <div className="text-sm text-gray-500">
                InstantSearch demo with faceting + relevance
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Tip: try <span className="font-semibold">sony</span>,{" "}
              <span className="font-semibold">tv</span>,{" "}
              <span className="font-semibold">bose</span>,{" "}
              <span className="font-semibold">laptop</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <Configure hitsPerPage={12} />

          <div className="mb-4">
            <SearchBox
              placeholder="Search products…"
              classNames={{
                root: "relative",
                form: "relative",
                input:
                  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm shadow-sm outline-none focus:ring-2 focus:ring-indigo-500",
                submit:
                  "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer hover:text-gray-600",
                reset:
                  "absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer hover:text-gray-600",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-start">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm max-h-[calc(100vh-7rem)] overflow-auto">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Filters</h2>
                <ClearRefinements
                  classNames={{
                    button:
                      "text-xs font-semibold text-gray-100 hover:text-gray-100 hover:underline underline-offset-2",
                    disabledButton: "opacity-40",
                  }}
                  translations={{
                    resetButtonText: "Clear filters"
                  }}
                />
              </div>

              <div className="mt-3">
                <CurrentRefinements
                  classNames={{
                    root: "",
                    item:
                      "flex items-center gap-1.5 rounded-lg bg-indigo-600 text-white px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-indigo-700 transition-colors",
                    label: "hidden",
                    category: "font-semibold",
                    delete: "ml-0.5 text-indigo-200 hover:text-white cursor-pointer hover:bg-indigo-500 rounded px-1 -mr-1",
                  }}
                />
              </div>

              <Divider />

              <SectionTitle>Category</SectionTitle>
              <RefinementList
                attribute="categories"
                classNames={{
                  root: "text-sm",
                  list: "space-y-1",
                  item: "flex",
                  label: "flex items-center gap-2 cursor-pointer",
                  checkbox:
                    "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                  labelText: "text-gray-700",
                  count:
                    "ml-auto text-xs text-gray-500 bg-indigo-100 rounded-full px-2 py-0.5",
                }}
              />

              <Divider />

              <SectionTitle>Manufacturer</SectionTitle>
              <RefinementList
                attribute="manufacturer"
                classNames={{
                  root: "text-sm",
                  list: "space-y-1",
                  label: "flex items-center gap-2 cursor-pointer",
                  checkbox:
                    "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                  labelText: "text-gray-700",
                  count:
                    "ml-auto text-xs text-gray-500 bg-indigo-100 rounded-full px-2 py-0.5",
                }}
              />

              <Divider />

              <SectionTitle>Type</SectionTitle>
              <RefinementList
                attribute="type"
                classNames={{
                  root: "text-sm",
                  list: "space-y-1",
                  label: "flex items-center gap-2 cursor-pointer",
                  checkbox:
                    "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                  labelText: "text-gray-700",
                  count:
                    "ml-auto text-xs text-gray-500 bg-indigo-100 rounded-full px-2 py-0.5",
                }}
              />

              <Divider />

              <SectionTitle>Price</SectionTitle>
              <RefinementList
                attribute="salePrice_range"
                classNames={{
                  root: "text-sm",
                  list: "space-y-1",
                  label: "flex items-center gap-2 cursor-pointer",
                  checkbox:
                    "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                  labelText: "text-gray-700",
                  count:
                    "ml-auto text-xs text-gray-500 bg-indigo-100 rounded-full px-2 py-0.5",
                }}
              />
            </aside>

            {/* Results */}
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <Stats classNames={{ root: "text-sm text-gray-600" }} />

                <SortBy
                  classNames={{
                    root: "text-sm",
                    select:
                      "rounded-xl border border-indigo-200 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-indigo-400",
                  }}
                  items={[
                    { label: "Relevance", value: indexName },
                    ...(priceAsc
                      ? [{ label: "Price (low → high)", value: priceAsc }]
                      : []),
                    ...(priceDesc
                      ? [{ label: "Price (high → low)", value: priceDesc }]
                      : []),
                  ]}
                />
              </div>

              <Hits 
                hitComponent={Hit} 
                classNames={{ 
                  list: "flex flex-col gap-3"
                }} 
              />

              <div className="mt-6 flex justify-center">
                <Pagination
                  classNames={{
                    root: "text-sm",
                    list: "flex items-center gap-2",
                    item:
                      "rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer",
                    selectedItem:
                      "rounded-lg border border-indigo-600 bg-indigo-600 text-white cursor-pointer",
                    disabledItem: "opacity-40 cursor-not-allowed",
                    link: "block px-3 py-2 no-underline",
                  }}
                />
              </div>
            </section>
          </div>
        </InstantSearch>
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10 text-xs text-gray-500">
        Built with Algolia.
      </footer>
    </div>
  );
}

