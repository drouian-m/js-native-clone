import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { Db, MongoClient } from "mongodb";
import { cloneDeepTest } from ".";

describe("Deep clone tests", () => {
	let client: MongoClient;
	let db: Db;
	beforeAll(async () => {
		client = new MongoClient("mongodb://localhost:27017");
		await client.connect();
		db = client.db("test-clone");
	});

	beforeEach(async () => {
		await db.dropDatabase();
	});

	afterAll(async () => {
		await client.close();
	});

	it("should clone a classic object", () => {
		const postDate = new Date();
		const post = {
			title: "My awesome blog post",
			description: "This is an awesome post !",
			date: postDate,
			author: "doe-j",
		};

		const clone = cloneDeepTest(post);
		clone.description = "Oh wow !!!";

		expect(clone).toEqual({
			title: "My awesome blog post",
			description: "Oh wow !!!",
			date: postDate,
			author: "doe-j",
		});
		expect(post).toEqual({
			title: "My awesome blog post",
			description: "This is an awesome post !",
			date: postDate,
			author: "doe-j",
		});
	});

	it("should clone a complex object", () => {
		const obj = {
			id: "1ec486a8-8716-4f31-9e1f-7817203b9718",
			isActive: true,
			picture: "http://placehold.it/32x32",
			name: "Porter Bush",
			email: "porterbush@ewaves.com",
			phone: "+1 (933) 419-2390",
			address: "728 Garnet Street, Volta, Kansas, 5861",
			about:
				"Magna pariatur mollit eu mollit dolor sint velit officia elit. Commodo veniam est ex fugiat. Sunt ea incididunt ut sit. Cillum consectetur elit tempor incididunt nostrud amet. Adipisicing duis esse cillum magna amet nostrud velit aliquip sint nostrud aute. Irure exercitation voluptate sint incididunt cillum reprehenderit qui Lorem nostrud velit cillum. Proident labore quis ut incididunt deserunt excepteur enim labore aliqua incididunt.\r\n",
			registered: "2018-09-14T07:40:05 -02:00",
			latitude: 36.967226,
			longitude: -57.422612,
			infos: {
				company: "Rotodyne",
				city: "Boykin",
				email: "alyceconway@ebidco.com",
			},
			tags: ["nulla", "non", "eu", "et", "voluptate", "labore", "sit"],
			friends: [
				{
					id: 0,
					name: "Marilyn Langley",
				},
				{
					id: 1,
					name: "Freeman Nieves",
				},
				{
					id: 2,
					name: "Michael Hodges",
				},
			],
		};

		const clone = cloneDeepTest(obj);
		clone.infos.city = "Fulford";

		expect(clone).toEqual({
			id: "1ec486a8-8716-4f31-9e1f-7817203b9718",
			isActive: true,
			picture: "http://placehold.it/32x32",
			name: "Porter Bush",
			email: "porterbush@ewaves.com",
			phone: "+1 (933) 419-2390",
			address: "728 Garnet Street, Volta, Kansas, 5861",
			about:
				"Magna pariatur mollit eu mollit dolor sint velit officia elit. Commodo veniam est ex fugiat. Sunt ea incididunt ut sit. Cillum consectetur elit tempor incididunt nostrud amet. Adipisicing duis esse cillum magna amet nostrud velit aliquip sint nostrud aute. Irure exercitation voluptate sint incididunt cillum reprehenderit qui Lorem nostrud velit cillum. Proident labore quis ut incididunt deserunt excepteur enim labore aliqua incididunt.\r\n",
			registered: "2018-09-14T07:40:05 -02:00",
			latitude: 36.967226,
			longitude: -57.422612,
			infos: {
				company: "Rotodyne",
				city: "Fulford",
				email: "alyceconway@ebidco.com",
			},
			tags: ["nulla", "non", "eu", "et", "voluptate", "labore", "sit"],
			friends: [
				{
					id: 0,
					name: "Marilyn Langley",
				},
				{
					id: 1,
					name: "Freeman Nieves",
				},
				{
					id: 2,
					name: "Michael Hodges",
				},
			],
		});

		expect(obj).toEqual({
			id: "1ec486a8-8716-4f31-9e1f-7817203b9718",
			isActive: true,
			picture: "http://placehold.it/32x32",
			name: "Porter Bush",
			email: "porterbush@ewaves.com",
			phone: "+1 (933) 419-2390",
			address: "728 Garnet Street, Volta, Kansas, 5861",
			about:
				"Magna pariatur mollit eu mollit dolor sint velit officia elit. Commodo veniam est ex fugiat. Sunt ea incididunt ut sit. Cillum consectetur elit tempor incididunt nostrud amet. Adipisicing duis esse cillum magna amet nostrud velit aliquip sint nostrud aute. Irure exercitation voluptate sint incididunt cillum reprehenderit qui Lorem nostrud velit cillum. Proident labore quis ut incididunt deserunt excepteur enim labore aliqua incididunt.\r\n",
			registered: "2018-09-14T07:40:05 -02:00",
			latitude: 36.967226,
			longitude: -57.422612,
			infos: {
				company: "Rotodyne",
				city: "Boykin",
				email: "alyceconway@ebidco.com",
			},
			tags: ["nulla", "non", "eu", "et", "voluptate", "labore", "sit"],
			friends: [
				{
					id: 0,
					name: "Marilyn Langley",
				},
				{
					id: 1,
					name: "Freeman Nieves",
				},
				{
					id: 2,
					name: "Michael Hodges",
				},
			],
		});
	});

	it("should works with MongoDB ObjectIDs", async () => {
		const postDate = new Date();
		const post = {
			id: "6459cd9f-b12b-4224-9cd9-1969c5390cf2",
			title: "My awesome blog post",
			description: "This is an awesome post !",
			date: postDate,
			author: "doe-j",
		};

		await db.collection("post").insertOne(post);
		const found = await db.collection("post").findOne({ id: post.id });

		const clone = cloneDeepTest(found)!;

		expect(clone._id).toEqual(found?._id);
	});
});
