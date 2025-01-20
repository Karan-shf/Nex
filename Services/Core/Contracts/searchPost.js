export default function validateSearchPost(userID,content,startDate,endDate) {

    if (userID && (content || startDate || endDate)) return "userID and (content, startDate, endDate) can not co exist";
    if (!userID && (!content || !startDate || !endDate)) return "if userID does not exist you need all (content, startDate, endDate) fields";

    return null
}