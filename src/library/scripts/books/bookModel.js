function Book() {
    this.title = undefined;
    this.author = { firstName: undefined, lastName: undefined };
    this.categories = [];
    this.cost = undefined;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.image_url = undefined;
    this.rating = undefined;
}
