import { notifRead, notifReadByID, notifCountUnseen } from "../Infrastructure/notif.js";

export async function getUserNotifs(req,res) {
    
    const notifs = await notifRead({
        userID: req.user.id,
    },req.query.limit, req.query.offset);

    const moreNotifs = await notifRead({
        userID: req.user.id
    }, 1, req.query.offset+req.query.limit);
    const hasMore = moreNotifs.length == 0 ? false:true;

    return res.status(200).json({
        hasMore: hasMore,
        data: notifs
    });
}

export async function viewNotif(req,res) {
    
    let notif = await notifReadByID(req.params.id);

    if (!notif) return res.status(404).json({error:"notif instance not found"});
    if (notif.isSeen) return res.status(400).json({error:"notif has already been seen"});
    if (notif.userID != req.user.id) return res.status(403).json({error:"you don't have access to this notif"});

    notif.isSeen = true
    notif = await notif.save();

    return res.status(200).json(notif);
}

export async function getUnseenNotifCount(req,res) {
    const response = await notifCountUnseen(req.user.id);
    return res.status(200).json(response);
}