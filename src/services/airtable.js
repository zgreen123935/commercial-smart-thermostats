import Airtable from 'airtable'

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.VUE_APP_AIRTABLE_API_KEY
}).base(process.env.VUE_APP_AIRTABLE_BASE_ID)

export const AirtableService = {
  // Create a new installation record
  async createInstallation(data) {
    try {
      const record = await base('Installations').create({
        "Site Name": data.siteName,
        "Address": data.address,
        "Number of Thermostats": data.numThermostats,
        "Installer Name": data.installerName,
        "Installer Company": data.installerCompany,
        "Installation Date": new Date().toISOString(),
        "Status": "In Progress"
      })
      return record
    } catch (error) {
      console.error('Error creating installation:', error)
      throw error
    }
  },

  // Update installation with thermostat details
  async updateThermostatDetails(installationId, thermostatData) {
    try {
      const record = await base('Thermostats').create({
        "Installation": [installationId],
        "Old Thermostat Photos": thermostatData.photos,
        "Has Common Wire": thermostatData.hasCommonWire,
        "HVAC System Type": thermostatData.hvacType,
        "Config Code": thermostatData.configCode,
        "Working Status": thermostatData.isWorking
      })
      return record
    } catch (error) {
      console.error('Error updating thermostat details:', error)
      throw error
    }
  },

  // Complete installation
  async completeInstallation(installationId) {
    try {
      const record = await base('Installations').update(installationId, {
        "Status": "Completed",
        "Completion Date": new Date().toISOString()
      })
      return record
    } catch (error) {
      console.error('Error completing installation:', error)
      throw error
    }
  }
}
