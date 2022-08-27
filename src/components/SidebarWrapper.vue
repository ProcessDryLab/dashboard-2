<template>
	<nav class="col-md-4 col-lg-3 d-md-block bg-light sidebar collapse px-0 border-right">
		<div class="sidebar-sticky px-0 mx-0">
			<div style="height: calc(100vh - 86px)">
				<div class="h-75 overflow-auto pb-1">
					<b-nav class="flex-column">
						<b-button
							variant="outline-secondary"
							class="mt-3 mx-2"
							v-b-modal.new-file-modal
							:disabled="this.$store.getters.getSystemStatus != 'online'"
						>
							<b-icon icon="cloud-upload" /> Upload file
						</b-button>
						<b-button
							variant="outline-secondary"
							class="mt-1 mx-2"
							:disabled="this.$store.getters.getSystemStatus != 'online'"
						>
							<b-icon icon="gear-wide-connected" /> New mining instance
						</b-button>
					</b-nav>
					<SidebarResourcesList />
				</div>
				<div class="h-25 overflow-auto border-top">
					<SidebarOperationsList />
				</div>
			</div>
			<SidebarStatusSummary />
		</div>
		<FileUploadModal />
	</nav>
</template>

<script>
import SidebarResourcesList from "./SidebarResourcesList.vue";
import SidebarOperationsList from "./SidebarOperationsList.vue";
import SidebarStatusSummary from "./SidebarStatusSummary.vue";
import FileUploadModal from "../modals/FileUploadModal.vue";

export default {
	name: "SidebarWrapper",
	components: {
		SidebarResourcesList,
		SidebarOperationsList,
		SidebarStatusSummary,
		FileUploadModal,
	},
};
</script>

<style>
/*
 * Sidebar
 */

.sidebar {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 100; /* Behind the navbar */
	padding: 56px 0 0; /* Height of navbar */
}

@media (max-width: 767.98px) {
	.sidebar {
		top: 5rem;
	}
}

.sidebar-sticky {
	position: relative;
	top: 0;
	height: calc(100vh - 56px);
	overflow-x: hidden;
	overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
	.sidebar-sticky {
		position: -webkit-sticky;
		position: sticky;
	}
}

.sidebar .nav-link {
	font-weight: 500;
	color: #333;
}

.sidebar .nav-link .feather {
	margin-right: 4px;
	color: #999;
}

.sidebar .nav-link.active {
	color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
	color: inherit;
}

.sidebar-heading {
	font-size: 0.75rem;
	text-transform: uppercase;
}

.feather {
	width: 16px;
	height: 16px;
	vertical-align: text-bottom;
}
</style>
