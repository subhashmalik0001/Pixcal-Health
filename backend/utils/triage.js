const calculateTriage = (symptoms, vitals, answers) => {
  let score = 0;
  let riskFactors = [];

  // Critical symptoms (Red flags)
  const criticalSymptoms = [
    'chest pain', 'difficulty breathing', 'severe headache', 
    'loss of consciousness', 'severe bleeding'
  ];
  
  // Moderate symptoms (Yellow flags)
  const moderateSymptoms = [
    'high fever', 'persistent cough', 'severe pain',
    'vomiting', 'dizziness'
  ];

  // Check symptoms
  symptoms.forEach(symptom => {
    const lowerSymptom = symptom.toLowerCase();
    if (criticalSymptoms.some(cs => lowerSymptom.includes(cs))) {
      score += 30;
      riskFactors.push(`Critical symptom: ${symptom}`);
    } else if (moderateSymptoms.some(ms => lowerSymptom.includes(ms))) {
      score += 15;
      riskFactors.push(`Moderate symptom: ${symptom}`);
    } else {
      score += 5;
    }
  });

  // Check vitals
  if (vitals) {
    if (vitals.bp && (vitals.bp.systolic > 180 || vitals.bp.diastolic > 110)) {
      score += 25;
      riskFactors.push('Severe hypertension');
    } else if (vitals.bp && (vitals.bp.systolic > 140 || vitals.bp.diastolic > 90)) {
      score += 10;
      riskFactors.push('High blood pressure');
    }

    if (vitals.spO2 && vitals.spO2 < 90) {
      score += 30;
      riskFactors.push('Low oxygen saturation');
    } else if (vitals.spO2 && vitals.spO2 < 95) {
      score += 15;
      riskFactors.push('Borderline oxygen levels');
    }

    if (vitals.temperature && vitals.temperature > 103) {
      score += 20;
      riskFactors.push('High fever');
    } else if (vitals.temperature && vitals.temperature > 100.4) {
      score += 10;
      riskFactors.push('Fever');
    }

    if (vitals.heartRate && (vitals.heartRate > 120 || vitals.heartRate < 50)) {
      score += 15;
      riskFactors.push('Abnormal heart rate');
    }
  }

  // Determine triage level
  let level, confidence, recommendations;
  
  if (score >= 40) {
    level = 'red';
    confidence = Math.min(95, 75 + (score - 40) * 0.5);
    recommendations = [
      'Seek immediate emergency care',
      'Call ambulance (108)',
      'Do not drive yourself',
      'Bring this assessment to hospital'
    ];
  } else if (score >= 20) {
    level = 'yellow';
    confidence = Math.min(90, 70 + (score - 20) * 0.8);
    recommendations = [
      'See a doctor within 24 hours',
      'Monitor symptoms closely',
      'Visit nearest health center',
      'Avoid strenuous activity'
    ];
  } else {
    level = 'green';
    confidence = Math.min(85, 60 + score * 1.2);
    recommendations = [
      'Continue with self-care',
      'Rest and stay hydrated',
      'Monitor symptoms for 48 hours',
      'Seek care if symptoms worsen'
    ];
  }

  return {
    level,
    confidence: Math.round(confidence),
    score,
    riskFactors,
    recommendations
  };
};

module.exports = { calculateTriage };