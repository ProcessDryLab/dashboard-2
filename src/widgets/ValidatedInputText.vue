<template>
	<div>
		<div v-if="type.toLowerCase() == 'choice'">
			<b-form-group v-bind:label="label">
				<b-form-radio
					:key="p"
					v-for="p in placeholder.split(';')"
					v-bind:state="state"
					@input="update"
					:name="label"
					:value="p"
				>
					{{ p }}
				</b-form-radio>
			</b-form-group>
		</div>
		<b-form-group v-else v-bind:label="label" v-bind:state="state">
			<b-form-file
				v-if="type.toLowerCase() == 'file'"
				placeholder="Upload a file"
				drop-placeholder="Drop file here..."
				v-bind:state="state"
			/>
			<b-form-input
				v-else
				type="text"
				:placeholder="placeholder"
				:value="value"
				@input="update"
				v-bind:state="state"
			/>
			<b-form-invalid-feedback v-bind:state="state" v-html="error" />
		</b-form-group>
	</div>
</template>

<script>
export default {
	name: "ValidatedInputText",
	props: ["host", "label", "placeholder", "error", "value", "state", "type"],
	methods: {
		update(newValue) {
			this.$emit("input", newValue);
		},
	},
};
</script>
