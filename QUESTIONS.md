## Question 1
Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:
- Records
- Indexing

I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking." 

Cheers,
George

---

Hi George,

These are good questions. Let's talk definitions.

- **Records** are the individual items that a search engine indexes and returns as results when you perform a search. For an ecommerce company, a record could be a collection of all the attributes for a SKU (name, description, thumbnail, customer rating, popularity, etc). When you search for "Sony HDTV", the search engine will return every record that relates to that search query, each record being for example the Sony Bravia 55" HDTV SKU, the Sony Bravia 65" HDTV SKU, Sony TV stands, Sony HDTV cables, and so on. Each of those SKUs is a record.
- **Indexing** is the method by which the search engine takes in records, stores them, analyzes them, and structures them so that they can be easily retrieved and displayed to the user. This is how the search engine in the above example could take the data for the ecommerce SKUs and optimize results so that the real HDTVs show up first when you search for "Sony HDTV" and not HDTV cables, for example. Indexing allows the search engine to apply relevance and ranking logic to provide the best possible experience for the end user.

**Custom Ranking** is the process by which you can optimize search results based on properties that are important to your business. Once Algolia has determined results based on the text of the user's search query, these custom properties can tweak the order of results shown based on signals like the following:

- Popularity signals (e.g., number of purchases, best-selling rank, page views)
- Engagement signals (e.g., number of reviews, ratings, clicks)
- Freshness or recency (e.g., release date, last updated timestamp)
- Commercial value (e.g., margin, price, stock availability)
- Quality signals (e.g., editorial score, content completeness)

For the TV example above, you could show the latest model of Sony 55" HDTV first (recency signal) or highest ranked Sony HDTV first (popularity signal) based on how you set up your custom rankings. You can add multiple custom rankings to set up signal relevance in exactly the way that fits your use cases best.

Hope that helps!

## Question 2
Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards,
Matt

---

Hi Matt,

Thank you for letting us know about this -- it's definitely actionable feedback that we can take back to the Engineering team. We had re-designed the index clearing feature to optimize the onboarding experience for new users, but you're right that this adds friction for those like yourself who are iterating and building. I'll pass your feedback to our product engineering team that our re-design is slowing down iteration.

As a workaround in the meantime, I would recommend using the API to clear and delete indexes during development. It might provide a quicker experience when building.

Thank you for taking the time to share this!

## Question 3
Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?

Regards,
Leo

---

Hi Leo,

Great questions. In my experience most development teams have been able to get a first build of Algolia up and running within 48 hours of getting started. At a high level, the process involves:

- Indexing the website records you want to search into Algolia
- Configuring relevance, ranking, and filtering in the Algolia dashboard
- Setting up a front end search UI on your site (we have easy-to-use InstantSearch libraries you can pop in for this)
- Iterating and fine tuning based on user behavior once your MVP is up and running

That's it! We aim to provide an easy setup experience and I'm happy to provide a demo or walk through your data with you to help get started.
