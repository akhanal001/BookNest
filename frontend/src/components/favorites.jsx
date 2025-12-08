export async function addToFavorites(book) {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in to add favorites.");
      return;
    }
  
    const res = await fetch("/api/favorites/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: book.title,
        author: book.authors?.join(", "),
        thumbnail: book.thumbnail,
        category: book.categories?.[0] || "Unknown"
      })
    });
  
    const data = await res.json();
  
    if (res.ok) {
      alert(`${book.title} added to favorites!`);
    } else {
      alert(data.error || "Could not add to favorites.");
    }
  }
  