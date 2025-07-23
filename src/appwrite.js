const submitRating = async () => {
  if (!rating) return;
  try {
    await databases.createDocument(
      'ratings', 
      'productRatings', 
      ID.unique(),
      {
        productId: id,
        userId: 'anonymous', 
        rating: rating,
      }
    );
    showToast("Thank you for rating!");
    setHasRated(true);
  } catch (error) {
    console.error("Rating failed:", error);
    showToast("Failed to submit rating.");
  }
};
