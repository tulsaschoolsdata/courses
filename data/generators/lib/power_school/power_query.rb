module PowerSchool::PowerQuery
  class Error < StandardError; end

  class Response
    attr_reader :response, :name, :count, :records, :extensions

    def initialize(response)
      parsed_response = parse(response)

      @response = response
      @name = parsed_response[:name]
      @count = parsed_response[:count]
      @records = parsed_response[:record]
      @extensions = parsed_response[:@extensions]
    end

    private

    def parse(response)
      raise Error, response.parsed_response.to_s unless response.code == 200

      response.parsed_response.with_indifferent_access
    end
  end
end
