require 'forwardable'
require 'ps_utilities'

module PowerSchool
  class Client
    extend Forwardable

    def_delegators :@connection, :run

    def initialize(
      base_uri:,
      client_id:,
      client_secret:,
      auth_endpoint: '/oauth/access_token'
    )
      raise ArgumentError, 'base_uri is required' unless base_uri.present?
      raise ArgumentError, 'client_id is required' unless client_id.present?
      raise ArgumentError, 'client_secret is required' unless client_secret.present?
      raise ArgumentError, 'auth_endpoint is required' unless auth_endpoint.present?

      config = {
        api_info: {
          base_uri: base_uri,
          auth_endpoint: auth_endpoint
        },
        client_info: {
          client_id: client_id,
          client_secret: client_secret
        }
      }

      @connection = PsUtilities::Connection.new(**config)
    end
  end
end
