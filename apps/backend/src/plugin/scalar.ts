import Scalar from "@scalar/fastify-api-reference"

export default async function scalar(fastify: Fastify) {
    // oxlint-disable-next-line
    // @ts-ignore
    await fastify.register(Scalar, {
        routePrefix: "/",
        configuration: {
            theme: "deepSpace",
            layout: "modern",
            hideModels: true,
            hideTestRequestButton: true,
            hideClientButton: true,
            showSidebar: true,
            showDeveloperTools: "never",
            operationTitleSource: "summary",
            persistAuth: false,
            telemetry: false,
            isEditable: false,
            isLoading: false,
            documentDownloadType: "both",
            hideSearch: false,
            showOperationId: false,
            hideDarkModeToggle: false,
            withDefaultFonts: true,
            defaultOpenFirstTag: false,
            defaultOpenAllTags: false,
            expandAllModelSections: false,
            expandAllResponses: false,
            orderSchemaPropertiesBy: "alpha",
            orderRequiredPropertiesFirst: true,
            _integration: "fastify",
            default: false,
            hiddenClients: true,
            slug: "api",
            title: "api",
            pageTitle: "API Documentation",
            mcp: { disabled: true },
            agent: { disabled: true }
        }
    })
}
