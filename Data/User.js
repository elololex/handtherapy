class User {
    static currentUser = "defaultUser";
    static currentPage = "defaultPage";
    static lastLoadDate = null;

    //other relevant code here
	static getCurrentPage() {
        return this.currentPage;
    }
    static setCurrentPage(str) {
        this.currentPage = str;
    }
    static getCurrentUser() {
        return this.currentUser;
    }
    static setCurrentUser(str) {
        this.currentUser = str;
    }
}

export default User;