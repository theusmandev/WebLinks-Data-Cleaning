# From Bookmark Chaos to 200+ Living Urdu Novel Goldmines  
A Personal Data Rescue Mission for Smart Urdu Novel Bank

Hey there 👋  

This isn’t just a “WebLinks-Data-Cleaning” readme.  

This is the story of how I turned several years of messy, joyful, obsessive bookmarking into something actually useful for thousands of Urdu novel lovers.

For many years I was that guy who — every time I found a beautiful old Urdu novel site, a rare Mediafire folder, or a hidden blog full of rare novels — quickly hit Ctrl+D and threw it into my already exploding Google Bookmarks folder called “Novels” (which, honestly, should have been named “Novels + Memes + Random YouTube + Allah knows what else”).

Fast forward to 2025: I’m running [Smart Urdu Novel Bank](https://www.urdunovelbanks.com/2025/04/smart-urdu-novel-bank-ai-powered-novel.html) → already hosting 70,000+ novels — and I desperately want to make Smart Urdu Novel Bank 10× better. That means finding, scraping and bringing in thousands more novels from every corner of the internet.

But first… I had to clean up my own mess.

## The Real Starting Point

Exported ~4,000–5,000 bookmarks from many years → got one giant HTML file → parsed it into Google Sheets using Apps Script → stared at thousands of rows thinking:  
“Okay… now what?”

Most links were:
- Facebook posts  
- Instagram reels  
- YouTube drama OSTs  
- Random forum threads  
- …and yes, some actual gold — old Blogspot sites, personal hosting pages, Mediafire index pages full of novels

So I rolled up my sleeves.

## How I Actually Did It (The Human Way)

### Phase 1 – The Orange Marker Era  
I opened the giant sheet and started scrolling… and scrolling… and scrolling.  
Every time I saw a link that screamed “Urdu novels live here”, I painted the whole row **orange** (yes, with my mouse, like a 90s kid highlighting notes).

After 2–3 evenings of chai + scrolling, I had maybe 400–500 orange rows.

Then I wrote my first little script:  
“Find all orange rows → copy them to a new sheet called Orange Data”  

That felt like magic.

### Phase 2 – Turning Ugly Deep Links into Clean Domains

Most bookmarks were not clean domains.  
They were:

https://novelbank.blogspot.com/2021/07/anarkali-novel-by-imran-series-complete.html?m=1&fbclid=IwAR3longgarbage  

So I learned just enough regex to save my life:
^https?://[^/]+


…and slowly turned thousands of monster URLs into nice clean:

- rekhta.org  
- urdunovelbanks.com  
- zubi novels.blogspot.com  
- etc.

Also killed all the `www.`, forced everything to `https://`, removed trailing slashes — basically made them look like adults.

### Phase 3 – The “Are You Even Alive?” Test

Here came the hardest (and most heartbreaking) part.

I wrote a script that politely knocks on every domain:

- 200 → “Hi, I’m alive and hosting novels 🥳”  
- 404 → “Sorry bro… I died years ago 😢”  
- 403 / 503 / timeout → “I’m either angry or sleeping, come back later”

Google gave me only 6 minutes per run → so I added “memory”:  
the script remembers which rows already have a status code and skips them next time.  
That little trick let me run it 7–8 times over two days until everything was checked.

Seeing 404 after 404 hurt… but seeing 200 after a long-forgotten Blogspot link felt like finding buried treasure.

## Final Treasure Chest (January 2026)

After all the crying, chai, regex headaches and #REF! disasters:

- ~220 clean, living domains that actually host Urdu novels  
- Ready to be crawled for titles + Mediafire / GDrive links  
- Sorted, deduplicated, human-verified-ish


## The Real Tools I Used (My Script Arsenal)

Here are all the functions I actually ran — in roughly the order I used them:

1. **`copyOrangeTextRows()`**  
   → My first hero script. Scanned the giant raw sheet, looked for my chosen orange text color (#FF9900 — after many failed attempts with wrong shades), and copied only those rows to a new sheet called **"Orange Data"**.  
   This saved me from manually copying 400–500 rows by hand.

2. **`makeAllUrlsClickable()`**  
   → Turned plain text URLs in Column A into proper HYPERLINK formulas so I could quickly click and see if the site looked promising. Saved tons of copy-paste pain.

3. **`checkUrlStatusWithResume()`** (the most important & painful one — I ran this many times)  
   → Pings every URL in Column A → writes status in Column B.  
   - 200 → ✅ Active  
   - Other codes → ⚠️ Code: XXX  
   - Timeout/error → 💀 Dead  
   Biggest life-saver: **resume logic** — skips rows that already have a status. Because Google gives only ~6 minutes per run → I had to run it 6–10 times over days.  
   Also flushes every 5 rows so nothing gets lost.

4. **`shiftDataUp()`**  
   → After moving active URLs to Column D (manually or with formulas), this quickly removes blank cells in Column D and shifts everything upward so I get one clean continuous list for the next scraping phase.

5. **`runProfessionalCleaning()`** (later attempt at one master function — but I mostly used the separate ones)  
   → Tried to combine trimming, deduplication, color filtering into one run. Useful for learning, but in reality I did steps separately because debugging was easier.

## What’s Next (The Exciting Part)

Now the fun begins:

1. Build the respectful crawler  
2. Extract novel names + author + download links  
3. Clean → categorize → push into Smart Urdu Novel Bank  
4. Let readers search “any novel in the world” (almost)

I’m genuinely excited.

If you’re reading this — whether you’re a fellow developer, an Urdu literature lover, or just someone who likes messy-to-clean stories — feel free to say hi or drop ideas.

Because this project is not just code.  
It’s years of love for Urdu stories finally getting organized so more people can read them easily.
