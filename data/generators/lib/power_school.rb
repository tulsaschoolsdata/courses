require 'active_support'
require 'active_support/core_ext'

require_relative 'power_school/client'
require_relative 'power_school/power_query'

HTTParty::ConnectionAdapter::OPTION_DEFAULTS[:verify] = false if ENV['HTTPS_NO_VERIFY'] == '1'

module PowerSchool
  POWERQUERY_QUERY_STRING_PARAMETERS = %i[pagesize page order count dofor].freeze

  def self.powerquery(path:, body: {}, **options)
    options = (options || {}).symbolize_keys.merge(body: body.to_json)
    query_string = options.slice(*POWERQUERY_QUERY_STRING_PARAMETERS).compact.to_query
    options = options.except(*POWERQUERY_QUERY_STRING_PARAMETERS)

    api_path = [
      "/ws/schema/query/#{ENV['POWERSCHOOL_CLIENT_PLUGIN_NAMESPACE']}.#{path}",
      query_string.presence
    ].compact.join('?')

    response = client.run command: :post, api_path: api_path, options: options

    ::PowerSchool::PowerQuery::Response.new response
  end

  def self.client
    @client ||= PowerSchool::Client.new(
      base_uri: ENV['POWERSCHOOL_BASE_URI'],
      client_id: ENV['POWERSCHOOL_CLIENT_ID'],
      client_secret: ENV['POWERSCHOOL_CLIENT_SECRET']
    )
  end
end
