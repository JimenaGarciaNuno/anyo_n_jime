# anyo_n_jime 🌿💙

a digital library of me and my pookie &lt;3

---

## how to update the site (no coding needed!)

**The only file you ever need to edit is `content.json`.**

Open it in any text editor (Notepad, TextEdit, VS Code, etc.) and follow the examples below.
Then save the file and push to GitHub — the site updates automatically.

---

## adding a journal entry

Find the `"journal"` section and add a new entry at the **top** of the list
(new entries are shown first):

```json
"journal": [
  {
    "date": "June 21, 2026",
    "author": "anya",
    "text": "write your update here. as long as you want!"
  },
  ...existing entries below...
]
```

`"author"` can be `"jime"` or `"anya"` — it shows a little color badge.

---

## adding a photo (gallery: us)

1. Put the image file in the `images/us/` folder (create the folder if it doesn't exist).
2. Add an entry to `"gallery_us"`:

```json
{
  "src": "images/us/our-photo.jpg",
  "caption": "a little caption about this moment",
  "date": "June 21, 2026"
}
```

---

## adding a gallery 2 entry (descriptions)

```json
{
  "title": "the time we stayed up until 4am",
  "description": "write as much as you want here. this one is for memories that don't need a photo.",
  "date": "June 21, 2026",
  "author": "jime"
}
```

---

## adding a prompt

```json
{
  "type": "would you rather",
  "question": "your question here?",
  "option_a": "option one",
  "option_b": "option two",
  "date": "June 21, 2026"
}
```

For a regular question with no voting buttons, just leave out `option_a` and `option_b`:

```json
{
  "type": "question",
  "question": "what's something small that made you smile this week?",
  "date": "June 21, 2026"
}
```

---

## running locally (to preview before pushing)

Because the site loads `content.json` via fetch, you need a tiny local server to preview it.
The easiest way:

```bash
# if you have Python installed:
cd anyo_n_jime
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code and click "Go Live".

---

## publishing on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under "Source", choose **Deploy from a branch** → `main` → `/ (root)`.
4. Click Save. Your site will be live at `https://yourusername.github.io/anyo_n_jime/`

---

made with love 💚💙
