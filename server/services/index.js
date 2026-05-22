const nodemailer = require('nodemailer');
const emailCredentials = require('../credentials').email_credentials;
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
// const fetch = require('node-fetch'); // Import the 'fetch' function


const Services = {};

Services.TrimAllObjectValues = (data) => {
  Object.keys(data).forEach(item => {
    if (data[item] && (typeof data[item] === 'string')) { data[item] = data[item].trim(); }
  });
  return data;
}//End function

Services.MultiFieldSeparate = (data) => {
  let res = {};
  //@ Creating all variables for response
  Object.keys(data).forEach(item => { res[item] = []; });
  let firstKey = Object.keys(data)[0];//@ Get first key
  //@ Push the value to relative key
  Object.keys(data[firstKey]).forEach((item) => {
    Object.keys(res).forEach((it, i) => { res[it].push(data[it][item]); });
  });
  //@ Convert array to comma separated string
  Object.keys(res).forEach(item => { res[item] = '(%)' + res[item].join('(%)') + '(%)'; });
  return res;
}//End function

Services.ArrToStringForDB = (arr) => {
  return arr ? '(%)' + arr.join('(%)') + '(%)' : null;
}//End function

Services.StringToArrForDB = (stringFromDB, typeAsInt = false) => {
  let res = stringFromDB ? stringFromDB.split('(%)').slice(1, -1) : [];
  if (typeAsInt) { res = res.map(Number); }
  return res;
}//End function

Services.SetUserTypeAsName = (data, setValuesWithObj = false) => {
  if (data.length > 0) {
    data.forEach((item, i) => {
      if (item.type === 'sw') { item.dataValues.role = 'Support Worker'; }
      if (item.type === 'ndis') { item.dataValues.role = 'NDIS Provider'; }
      if (item.type === 'sm') { item.dataValues.role = 'Self-Managed Participants'; }
      if (item.type === 'ua') { item.dataValues.role = 'Admin'; }
      item.dataValues.full_name = item.first_name;
      if (item.last_name) { item.dataValues.full_name = item.first_name + ' ' + item.last_name; }
      //@Set Inner/Left join obj values with main array for frontend log
      if (setValuesWithObj) {
        setValuesWithObj.forEach(el => {
          if (item[el.objName] && item[el.objName][el.colName]) {
            if (el.newVar) {
              item.dataValues[el.labelName] = item[el.objName][el.colName];
            } else {
              item[el.labelName] = item[el.objName][el.colName];
            }//End if condition
          } else {
            item.dataValues[el.labelName] = '-';
            item[el.labelName] = '-';
          }//End if condition
        });
      }//End if condition
    });
  }//End if condition
  if (typeof data === 'object') {
    if (data.type === 'sw') { data.role = 'Support Worker'; }
    if (data.type === 'ndis') { data.role = 'NDIS Provider'; }
    if (data.type === 'sm') { data.role = 'Self-Managed Participants'; }
    if (data.type === 'ua') { data.role = 'Admin'; }
    data.full_name = data.first_name;
    if (data.last_name) { data.full_name = data.first_name + ' ' + data.last_name; }
  }//End if condition
  return data;
}//End function

Services.SplitName = (name) => {
  let part = name.split(' ')
  return { first_name: part.shift(), last_name: part.join(' ') }
}//End function

Services.ReadFile = async (fileNameWithPath, dataType = 'utf8') => {
  try {
    const data = await fs.promises.readFile(fileNameWithPath, dataType);
    const fileExtension = path.extname(fileNameWithPath).toLowerCase();
    if (fileExtension === '.json') {
      return { status: true, data: JSON.parse(data) };
    } else {
      return { status: true, data };
    }//End if condition
  } catch (error) {
    return { status: false, errorTitle: 'Error reading the file', errorMsg: error.message };
  }//End try catch
}//End function

Services.SaveFile = async (fileName, path, data, dataType = 'utf8') => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
    await fs.promises.writeFile(path + fileName, data, dataType);
    return { status: true, successMsg: 'File has been created successfully', fileName };
  } catch (err) {
    if (err.code === 'EEXIST') {
      return { status: false, errorMsg: 'Error creating folder: Folder already exists' };
    } else {
      return { status: false, errorMsg: err.message };
    }//End if condition
  }//End tru catch
};

Services.Base64ToImage = async (base64, fileName, path) => {
  if (!base64) { return false; }
  var type = ['jpeg', 'jpg', 'gif', 'png'];
  var base64Data = base64;
  type.forEach(tp => { base64Data = base64Data.replace(`data:image/${tp};base64,`, ""); });
  var result = {};
  try {
    result = await Services.SaveFile(fileName, path, base64Data, 'base64');
  } catch (error) {
    result = { status: false, errorMsg: error }
  }//End try catch
  return result;
}//End function

Services.GenerateTimeList = () => {
  const startTime = '2023-07-29 01:00';
  const endTime = '2023-07-29 24:00';
  const timeList = [];
  let currentTime = dayjs(startTime).startOf('day');
  while (currentTime.isBefore(dayjs(endTime))) {
    var tempTime = currentTime.format('hh:mm A');
    timeList.push({ label: tempTime, value: tempTime });
    currentTime = currentTime.add(15, 'minute');
  }//End while
  return timeList;
}//End function

Services.GenerateRandomCode = (length = 6) => {
  const min = 0;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(randomNumber).padStart(length, '0');
}//End function

Services.GenerateRandomHexColorCode = () => {
  // Generate random RGB values (0-255) in decimal format
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  // Convert RGB values to hexadecimal format
  const hexRed = red.toString(16).padStart(2, '0');
  const hexGreen = green.toString(16).padStart(2, '0');
  const hexBlue = blue.toString(16).padStart(2, '0');
  // Combine RGB values into a hexadecimal color code
  const hexColorCode = `#${hexRed}${hexGreen}${hexBlue}`;
  return hexColorCode;
}//End function

Services.HTTPRequest = (url, method = 'GET') => {
  // Checking if the URL is valid
  // And also check if it is http or https
  let mode = '';
  // Regular expression to match "http" or "https"
  let httpPattern = /^https?:\/\//i;
  if (httpPattern.test(url)) {
    mode = url.startsWith("http://") ? http : https;
  } else {
    return Promise.reject({ status: false, errorMsg: 'Invalid URL' });
  }

  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    const request = mode.request(url, options, (response) => {
      let data = '';
      // Receive data in chunks
      response.on('data', (chunk) => { data += chunk; });
      // When all data is received
      response.on('end', () => {
        const res = { status: true, data: data };
        resolve(res); // Resolve the Promise with the response
      });
    });
    // Handle errors
    request.on('error', (error) => {
      const errorResponse = { status: false, errorTitle: 'HTTP Server Error', errorMsg: error.message };
      reject(errorResponse); // Reject the Promise with the error
    });
    // Send the GET request
    request.end();
  });
}//End function

Services.SendSMS = async (smsOptions) => {
  const SMS_API_URL = `${process.env.SMS_API_URL}&to=${smsOptions.to}&text=${smsOptions.message}`;
  return await Services.HTTPRequest(SMS_API_URL);
}//End function

Services.SendEmail = (mailOptions) => {
  //# Documentation - https://nodemailer.com/about/
  return new Promise((resolve) => {
    if (!mailOptions) resolve({ status: false, error: 'Please provide mail options' });
    //@ If from email is not given then set admin@domainName default
    if (!mailOptions.from) mailOptions.from = `${process.env.COMPANY_NAME} <admin@${process.env.DOMAIN_NAME}>`;
    //@ If plain text is not given then set it from html
    if (!mailOptions.text) mailOptions.text = Services.HtmlToPlainText(mailOptions.html);
    var transporter = nodemailer.createTransport(emailCredentials);
    transporter.sendMail(mailOptions, (error, info) => {
      let res = !error ? { status: true, data: info } : { status: false, error };
      resolve(res);
    });
  });
}//End function

Services.EmailTemplate = (heading, subHeading, data, maxWidth = 600) => {
  return (`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif;line-height: 1.6;color: #333;background-color: #f9f9f9;margin: 0;padding: 20px;">
      <div style="border: 1px solid #${process.env.PRIMARY_COLOR}; max-width: ${maxWidth}px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 5px;">
        <div class="header" style="text-align: center; padding: 20px; background-color: #${process.env.BG_COLOR}; border-radius: 5px 5px 0 0; border-bottom: 2px solid #${process.env.PRIMARY_COLOR};">
          <table border="0" width="100%">
            <tr>
              <td width="30%" valign="center"><img src=${process.env.EMAIL_IMG_PATH} alt="Company Logo" class="logo" style="max-width: 200px; width: 140px;"></td>
              <td width="70%" valign="center" align="right">
                <h3 style="font-size: 26px; margin: 0; line-height: 22px;">${heading}</h3>
                ${subHeading}
              </td>
            </tr>
          </table>  
        </div>
        <div style="padding: 20px 40px;">${data}</div>
        <div style="text-align: center; padding: 20px; background-color: #${process.env.BG_COLOR}; border-radius: 0 0 5px 5px; border-top: 2px solid #${process.env.PRIMARY_COLOR};">
          <p style="margin: 5px 0;">For any questions or support, please contact us at <a href="mailto:support@${process.env.DOMAIN_NAME}">support@${process.env.DOMAIN_NAME}</p>
          <a href=${process.env.SOCIAL_FACEBOOK_LINK} target="_blank" style="display: inline-block; line-height: 20px; color: #fff; background-color: #0056AD; border-radius: 4px; text-decoration: none; padding: 6px 10px;">Facebook</a>
          <p style="margin: 5px 0;">&copy; ${dayjs().year()} ${process.env.COMPANY_NAME}. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>   
  `);
}//End function

Services.HtmlToPlainText = (htmlString) => {
  let plainText = htmlString;
  // Remove script tags and their content
  plainText = plainText.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Remove style tags and their content
  plainText = plainText.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  // Handle line breaks for specific HTML tags
  plainText = plainText.replace(/<br\s*[/]?>/gi, '\n');
  plainText = plainText.replace(/<\/p>/gi, '\n\n');
  plainText = plainText.replace(/<\/div>/gi, '\n\n');
  // Add more custom line break handling for other HTML tags here, if needed.
  // Remove all other HTML tags
  plainText = plainText.replace(/<[^>]+>/g, '');
  // Convert entities to plain text equivalents
  plainText = plainText
    .replace(/&nbsp;/gi, ' ') // Non-breaking space
    .replace(/&amp;/gi, '&') // Ampersand
    .replace(/&quot;/gi, '"') // Double quote
    .replace(/&apos;/gi, "'") // Single quote
    .replace(/&lt;/gi, '<') // Less than
    .replace(/&gt;/gi, '>'); // Greater than
  return plainText.trim(); // Trim any leading/trailing whitespace
}//End function

Services.GetTotalHourFromAvailability = (availability, hourLabelListFromDB) => {
  // console.log(hourLabelListFromDB);
  // Function to calculate total hours between 'from' and 'to' times
  const calculateTotalHours = (from, to) => from !== '-' && to !== '-' ? (new Date(`2000-01-01 ${to}`) - new Date(`2000-01-01 ${from}`)) / 3600000 : 0;
  // Calculate the total hours for the week
  const totalHours = Object.keys(availability.from).reduce((total, day) => !availability.not_available[day] ? total + calculateTotalHours(availability.from[day], availability.to[day]) : total, 0);
  // Determine the appropriate label based on the total hours
  var label = {};
  if (totalHours >= 1 && totalHours < 5) {
    label = hourLabelListFromDB[0];
  } else if (totalHours >= 5 && totalHours < 10) {
    label = hourLabelListFromDB[1];
  } else if (totalHours >= 10 && totalHours < 15) {
    label = hourLabelListFromDB[2];
  } else if (totalHours >= 15 && totalHours < 20) {
    label = hourLabelListFromDB[3];
  } else if (totalHours >= 20 && totalHours < 25) {
    label = hourLabelListFromDB[4];
  } else if (totalHours >= 25 && totalHours < 30) {
    label = hourLabelListFromDB[5];
  } else if (totalHours >= 30) {
    label = hourLabelListFromDB[6];
  }//End if condition
  return label.id; // Return the ID of the assigned label
}//End function

Services.GetLatitudeAndLongitudeFromAddress = async (address) => {
  // const apiKey = process.env.GOOGLE_GEO_LATI_LOG_API_KEY;
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  // const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  // const url = `http://api.geonames.org/postalCodeSearchJSON?placename=${encodeURIComponent(address)}&maxRows=10&country=AU&username=kashiffazal`;
  const url = `http://api.geonames.org/postalCodeSearchJSON?placename=${encodeURIComponent(address)}&maxRows=10&username=kashiffazal`;
  let response = {};
  try {
    let data = await Services.HTTPRequest(url);
    if (data.status) { data.data = JSON.parse(data.data); }
    response = data;
  } catch (error) {
    response = error;
  }//End try catch
  return response;
}//End function

Services.GetLatitudeAndLongitudeFromAddressWithRetry = async (postCode, suburb, state) => {
  // let address = postCode + ', ' + suburb + ', ' + state;
  let address = postCode + ', ' + suburb;//@ For demo
  //? Get lat and lng from address with postcode suburb and state
  let latAndLng = await Services.GetLatitudeAndLongitudeFromAddress(address);
  if (latAndLng.status) {
    //? If lat and lng is empty then remove suburb and try again
    if (latAndLng.data.postalCodes.length === 0) {
      address = postCode + ', ' + state;
      latAndLng = await Services.GetLatitudeAndLongitudeFromAddress(address);
      if (latAndLng.status) {
        //? Still not find after removing suburb so it's mean postcode is invalid
        if (latAndLng.data.postalCodes.length === 0) {
          return { status: false, errorTitle: 'Invalid Post Code', errorMsg: 'Please provide a valid postal code' };
        } else {
          //? Get lat and lng with postcode and state
          return { status: true, data: latAndLng.data.postalCodes[0] };
        }//End if condition
      }//End if condition
    } else {
      //? Get lat and lng with postcode, suburb and state 
      return { status: true, data: latAndLng.data.postalCodes[0] };
    }//End if condition
  }//End if condition
  return latAndLng;
}//End function

Services.SortArrayDateWise = (arr, dateCol) => {
  arr.sort((a, b) => {
    a.dateCol = a[dateCol] ? a[dateCol] : a.dataValues[dateCol];
    b.dateCol = b[dateCol] ? b[dateCol] : b.dataValues[dateCol];
    const [monthA, yearA] = a.dateCol.split(' ');
    const [monthB, yearB] = b.dateCol.split(' ');
    //? Compare years first
    if (yearA !== yearB) { return parseInt(yearA) - parseInt(yearB); }
    //? If years are the same, compare months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(monthA) - months.indexOf(monthB);
  });
  return arr;
}//End function

module.exports = Services//End module