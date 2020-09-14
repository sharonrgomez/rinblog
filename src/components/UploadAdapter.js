import { storage, firebase } from '../utilities/firebase'

class MyUploadAdapter {
	constructor(loader, user) {
		this.loader = loader
		this.user = user
	}
	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise((resolve, reject) => {
					if (file.size < 2000000) {
						let storageRef = storage.ref()
						let uploadTask = storageRef
							.child(`${this.user}/${file.name}`)
							.put(file)
						uploadTask.on(
							firebase.storage.TaskEvent.STATE_CHANGED,
							(snapshot) => {
							},
							(error) => {
								switch (error.code) {
									case 'storage/unauthorized':
										reject('User doesn\'t have permission to access the object')
										break

									case 'storage/canceled':
										reject('User canceled the upload')
										break

									case 'storage/unknown':
										reject(
											'Unknown error occurred, inspect error.serverResponse'
										)
										break
								}
							},
							() => {
								uploadTask.snapshot.ref
									.getDownloadURL()
									.then((downloadURL) => {
										resolve({
											default: downloadURL
										})
									})
							}
						)
					} else {
						alert('File must be smaller than 2MB. Anything bigger than that will not be uploaded.')
					}
				})
		)
	}
}
export default MyUploadAdapter