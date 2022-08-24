<template>
	<b-modal centered id="new-file-modal" title="Upload file" @ok="handleOk">
		<form ref="form" @submit.stop.prevent="handleSubmit">
			<!-- <ValidatedInputText label="File:" error="Upload a file" type="file" v-model="file" /> -->
			<b-form-group label="File to upload:">
				<b-form-file
					v-model="file"
					:state="Boolean(file)"
					placeholder="Choose a file or drop it here..."
					drop-placeholder="Drop file here..."
					@change="onChangeFileUpload()"
				></b-form-file>
			</b-form-group>
			<b-form-group label="Repository:">
				<b-form-select v-model="repository" :options="repositories" required></b-form-select>
			</b-form-group>
		</form>
	</b-modal>
</template>

<script>
import { RepositoryService } from "../services/repository";
import axios from "axios";

export default {
	name: "FileUploadModal",

	data: () => ({
		file: null,
		repository: "",
		repositories: [],
	}),
	mounted() {
		this.repositories = this.$store.getters.getHostsRepository.map((str) => ({ text: str.name, value: str.name }));
		this.repository = this.repositories[0].value;
	},
	methods: {
		handleSubmit() {
			console.log(this.file);
			const config = { headers: { "Content-Type": "multipart/form-data" } };
			const payload = new FormData();
			payload.append("upfile", this.file, config);
			axios.post(RepositoryService.buildUploadUrl(this.repository), payload).then(() => {
				console.log("uploaded");
			});
		},
		handleOk(bvModalEvt) {
			bvModalEvt.preventDefault();
			this.handleSubmit();
		},
	},
};
</script>
