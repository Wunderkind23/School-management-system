export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  nationality: string
  travelInterests: string[]
  role: 'traveler' | 'admin'
  createdAt: Date
  updatedAt: Date
  profilePicture: string
  emailNotificationsEnabled: boolean
  travelAlertsEnabled: boolean
  visaStatusUpdatesEnabled: boolean
  travelTipsRecommendationsEnabled: boolean
  promotionalOffersEnabled: boolean
  newsletterEnabled: boolean
}
