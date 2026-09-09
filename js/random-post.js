// Wires up the "random post" button on the home page.
//
// Pulls the canonical post list from posts/index.html so the button stays in
// sync as new posts are added there — no second list to maintain. Safe to
// load on pages without the button; it no-ops when #random-post is absent.
(function () {
  const button = document.getElementById("random-post");
  if (!button) return;

  button.addEventListener("click", async function () {
    button.disabled = true;
    try {
      const res = await fetch("./posts/index.html");
      if (!res.ok) throw new Error("Could not load post list");
      const doc = new DOMParser().parseFromString(
        await res.text(),
        "text/html",
      );
      const links = Array.from(
        doc.querySelectorAll(".post-list a.post-card-link[href]"),
      ).map((a) => a.getAttribute("href"));
      if (links.length === 0) throw new Error("No posts found");
      const pick = links[Math.floor(Math.random() * links.length)];
      window.location.href = "./posts/" + pick.replace(/^\.\//, "");
    } catch (err) {
      button.disabled = false;
      button.textContent = "Couldn't pick a post — try again";
      console.error(err);
    }
  });
})();
