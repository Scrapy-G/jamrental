import { Vehicle } from "../types";
import {
	doc,
	setDoc,
	collection,
	updateDoc,
	getDocs,
	writeBatch,
	WriteBatch,
	query,
	orderBy,
	where,
	endAt,
	startAt,
} from "firebase/firestore";
import { clientDb, clientStorage } from "./client";
import uuid from "react-native-uuid";
import { ref, uploadBytes } from "firebase/storage";
import { LatLng } from "react-native-maps";
import { distanceBetween, geohashQueryBounds } from "geofire-common";

const endpoint = "vehicles";
const storageEndpoint = "images/vehicles/";
const imagePrefix = "https://jamrental.mo.cloudinary.net/vehicles/";
const thumbnailPrefix =
	"https://jamrental.mo.cloudinary.net/thumbnail/vehicles/";

let batch: WriteBatch;

const addListing = async (listing: any) => {
	batch = writeBatch(clientDb);
	const listingRef = doc(clientDb, endpoint, uuid.v4().toString());
	batch.set(listingRef, {
		...listing,
		completed: false,
	});
	return listingRef;
};

const updateListing = async (refId: string, listing: any) => {
	const listingRef = doc(clientDb, endpoint, refId);
	await batch.update(listingRef, listing);
	return true;
};

const uploadImages = async (refId: string, imageUris: string[]) => {
	const imageNames: string[] = [];
	const result = await Promise.all(
		imageUris.map(async (imageUri) => {
			const fileName = uuid.v4() + "." + imageType(imageUri);
			const filePath = storageEndpoint + refId + "/" + fileName;
			const storageRef = ref(clientStorage, filePath);

			imageNames.push(fileName);

			const response = await fetch(imageUri);
			const blob = await response.blob();

			return await uploadBytes(storageRef, blob);
		})
	);

	const listingRef = doc(clientDb, endpoint, refId);
	batch.update(listingRef, {
		thumbnail: imageNames[0],
		images: imageNames,
	});

	return result;
};

const getListings = async (center: LatLng) => {
	const querySnapshots = await getListingsWithinRadius({
		...center,
		radiusInM: 10000,
	});
	const results: Vehicle[] = [];
	querySnapshots.forEach((doc) => {
		const listing = doc.data() as Vehicle;

		listing.thumbnail = `${thumbnailPrefix}/${doc.id}/${listing.thumbnail}`;
		const images: string[] = [];
		listing.images.forEach((imageUri) => {
			images.push(`${imagePrefix}/${doc.id}/${imageUri}`);
		});
		listing.images = images;

		results.push(listing);
	});
	return results;
};

const getListingsWithinRadius = async ({
	latitude,
	longitude,
	radiusInM,
}: any) => {
	const center = [latitude, longitude];
	const bounds = geohashQueryBounds(center, radiusInM);

	const promises = [];
	for (const b of bounds) {
		const vehiclesRef = collection(clientDb, "vehicles");
		const q = query(
			vehiclesRef,
			orderBy("geoHash"),
			startAt(b[0]),
			endAt(b[1])
		);
		promises.push(getDocs(q));
	}

	return await Promise.all(promises).then((snapshots) => {
		const matchingDocs = [];

		for (const snap of snapshots) {
			for (const doc of snap.docs) {
				const { latitude, longitude } = doc.get("coordinates");
				// We have to filter out a few false positives due to GeoHash
				// accuracy, but most will match
				const distanceInKm = distanceBetween(
					[latitude, longitude],
					center
				);
				const distanceInM = distanceInKm * 1.6;
				if (distanceInM <= radiusInM) {
					matchingDocs.push(doc);
				}
			}
		}
		return matchingDocs;
	});
};

const commitListing = async () => {
	await batch.commit();
	return true;
};

const imageType = (uri: string) => {
	const dotIndex = uri.lastIndexOf(".");
	return uri.substring(dotIndex + 1);
};

export { addListing, updateListing, uploadImages, commitListing, getListings };
