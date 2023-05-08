module.exports = ({ env }) => ({
  navigation: {
      enabled: true,
      config: {
          additionalFields: ['audience', { name: 'my_custom_field', type: 'boolean', label: 'My custom field' }],
          contentTypes: ['api::page.page', '*'],
          contentTypesNameFields: {
              'api::page.page': ['heading']
          },
          pathDefaultFields: {
              'api::page.page': ['heading']
          },
          allowedLevels: 2,
          gql: {},
      }
  }
});