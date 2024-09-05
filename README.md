RapidRescue: AI-Enhanced Hospital Selection Based
on Patient Emergency Calls

PROBLEM
Current systems fail to provide real-time, intelligent support
for ambulance drivers to select the most suitable hospital
based on occupancy, specialty, and support resources, leading
to potential delays and inefficiencies. An advanced,
responsive solution is needed to optimize hospital selection
and improve patient outcomes.

SOLUTION
Implement a real-time Hospital Selection System that
integrates live data on hospital occupancy, specialties, and
support resources. This system should use intelligent
algorithms to recommend the most suitable hospital for each
patient and provide ambulance drivers with optimized routing
and up-to-date information

TECHNOLOGY STACK
• Next JS (Development framework)
o Tailwind CSS(Styling)
o Google Firebase(Real Time Database)
o Node JS(Server Side Operations)
• MapBox API(Using Map Functionalities)
• Web Speech API (Voice to Text Translation)
• Gemini Ai(Best Hospital Selection)
• Geolocation API(To find ambulance location)
• Harversine Formula (used for finding distance btw two
coordinates)

APIS, Assests & Libraries

• MapBox API-It enhances hospital services by providing
optimized routing and geographic data. The Directions
API helps ambulances find the shortest, fastest routes,
considering real-time traffic for efficient rerouting. The
Geocoding API identifies nearby hospitals, converting
addresses to coordinates. This integration supports quick
location of medical facilities and improves emergency
response through interactive map visualization and route
optimization.

• Web Speech API-It enables voice-to-text translation,
allowing users to convert spoken words into written text
in real-time. It includes the SpeechRecognition interfacefor recognizing and transcribing speech, supporting
continuous listening and interim results. This API is
useful for applications that require voice input,
enhancing user accessibility and interaction. By
integrating Web Speech API.

• Gemini AI-It provides advanced algorithms for selecting
the best hospital based on various criteria. By analyzing
data such as hospital ratings, specialties, location, and
patient reviews, Gemini AI helps users identify the most
suitable healthcare facilities. It leverages machine
learning to offer personalized recommendations,
ensuring that users find hospitals with the best quality of
care and relevant medical expertise for their needs.

• Geolocation API-It allows web applications to pinpoint
the exact location of an ambulance in real-time. By
retrieving the device's latitude and longitude
coordinates, it facilitates accurate tracking and
monitoring of the ambulance's position. This capability is
crucial for coordinating emergency responses, optimizing
routes, and providing timely updates on the ambulance’s
arrival, thereby improving the efficiency and
effectiveness of emergency medical services.

INSTRUCTIONS FOR USE
o Type/Speak the symptoms you are sufferingo Hit the search button, The shortest location for
treatment will be shown
o The facilities in the hospital like bed availability, icu
availibity details can be updated in the hospital
dashboard by the authorised hospital staffs during
real time.