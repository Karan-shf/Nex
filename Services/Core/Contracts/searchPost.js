export default function validateSearchPost(userID,content,startDate,endDate) {

    if (userID && (content || startDate || endDate)) return "userID and (content, startDate, endDate) can not co exist";
    if (!userID && !content) return "you can't have no userID and no content";

    return null
}