import { firebase, db, storage } from "../firebase";

const submitForm = async (data) => {

    try {
        let dossier = {
            status: 'CLIENT_SUBMITTED',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            numero_pv: data.numPv,
            nom_carte_grise: data.nom,
            date_avis: data.dateAvis,
            immatriculation: data.immat,
            numero_permis: data.numPermis,
            date_permis: data.datePermis,
            nbr_points: data.nbrPoints,
            montant_amende: data.montant,
            requires_consignation: false,
            consignation_paid: false,
        }

        if (data.type != 'none') {
            dossier.requires_consignation = true;
        }


        let newDoc = await db.collection("contestations").add(dossier);
        const user = await firebase.getCurrentUser();
        const userUID = user.uid;
        console.log(user);
        console.log(newDoc.id);
        const dossierID = newDoc.id;
        let userData = await db.doc(`users/${userUID}`).get();
        let oldUserDossier = userData.data().dossiers;
        oldUserDossier.push(dossierID);
        await db.doc(`users/${userUID}`).update({
            dossiers: oldUserDossier
        })
        let snap = await storage.ref().child(dossierID).put(data.scan);
        if (snap.state == firebase.storage.TaskState.SUCCESS) {
            console.log("DONE");
            let docUrl = await snap.ref.getDownloadURL();
            await db.doc(`contestations/${dossierID}`).set({
                scan_url: docUrl
            }, { merge: true })
            return {
                success: true
            }
        }
        // storage.ref().child(dossierID).put(data.scan).then(async (snapshot) => {
        //     if (snapshot.state == firebase.storage.TaskState.SUCCESS) {
        //         console.log("DONE");
        //         let docUrl = await snapshot.ref.getDownloadURL();
        //         await db.doc(`contestations/${dossierID}`).set({
        //             scan_url: docUrl
        //         }, { merge: true })
        //         return {
        //             success: true
        //         }
        //     }
        // })
    } catch (err) {
        console.log(err);
        return {
            success: false,
            err: err
        };
    }

    // db
    //     .collection("contestations")
    //     .add(dossier)
    //     .then(async res => {
    //         const user = await firebase.getCurrentUser();
    //         const userUID = user.uid;
    //         console.log(user);
    //         console.log(res.id);
    //         const dossierID = res.id;
    //         let userData = await db.doc(`users/${userUID}`).get();
    //         let oldUserDossier = userData.data().dossiers;
    //         oldUserDossier.push(dossierID);
    //         db
    //             .doc(`users/${userUID}`)
    //             .update({
    //                 dossiers: oldUserDossier
    //             })
    //             .then(() => {
    //                 storage.ref().child(dossierID).put(data.scan).then(async (snapshot) => {
    //                     if (snapshot.state == firebase.storage.TaskState.SUCCESS) {
    //                         console.log("DONE");
    //                         let docUrl = await snapshot.ref.getDownloadURL();
    //                         db
    //                             .doc(`contestations/${dossierID}`)
    //                             .set({
    //                                 scan_url: docUrl
    //                             }, { merge: true })
    //                             .then(() => {
    //                                 console.log("processDone");
    //                                 return {
    //                                     success: true,
    //                                 };
    //                             })
    //                             .catch(err => {
    //                                 console.log(err);
    //                                 return {
    //                                     success: false,
    //                                     err: err
    //                                 };
    //                             });
    //                     }
    //                 })
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 return {
    //                     success: false,
    //                     err: err
    //                 };
    //             })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         return {
    //             success: false,
    //             err: err
    //         };
    //     });
}

export {
    submitForm
}