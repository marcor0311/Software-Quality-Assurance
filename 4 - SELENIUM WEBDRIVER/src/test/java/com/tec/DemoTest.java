package com.tec;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class DemoTest {
    WebDriver driver;

    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/opt/homebrew/bin/chromedriver");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-dev-shm-usage"); 
        options.addArguments("--no-sandbox"); 
        options.addArguments("--headless"); 
        options.addArguments("--disable-gpu"); 
        options.addArguments("--remote-allow-origins=*"); 

        driver = new ChromeDriver(options);
        driver.get("https://phptravels.com/demo");
    }

    // Prueba 1 Home > Company > Clients
    // Resultado esperado: Se espera que se redirija correctamente a la página de compania en la seccion clientes de PHPTRAVELS y que el título de la página sea "PHPTRAVELS Clients".
    @Test
    public void testNavigateToClientsPage() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement companyMenu = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/header/nav/div/div/ul/li[3]/a/span")));
    
        // Act
        companyMenu.click();
        WebElement clientsLink = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/header/nav/div/div/ul/li[3]/ul/li[1]/a")));
        clientsLink.click();
        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
        }
    
        // Assert
        WebElement h1Element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h1[@class='mb-0']")));
        assertTrue(h1Element.getText().equals("PHPTRAVELS Clients"), "Expected h1 text 'PHPTRAVELS Clients' not found on the page.");
    }

    // Prueba 2 Home > Demo 
    // Resultado esperado: Se espera que se redirija correctamente a la página de demo de PHPTRAVELS.
    @Test
    public void testDemoButton() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement tryDemoButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/header/nav/div/div/ul/li[4]/a")));
    
        // Act
        tryDemoButton.click();
        wait.until(ExpectedConditions.urlContains("phptravels.com/demo"));
    
        // Assert
        assertTrue(driver.getCurrentUrl().contains("phptravels.com/demo"), "Failed to navigate to Demo page.");
    }


    // Prueba 3 Home > Demo > Submit
    // Resultado esperado: Se espera que se muestre un mensaje de error indicando que el campo de nombre está vacío.
    @Test
    public void testEmptyFieldsInDemoRequestForm() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement tryDemoButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/header/nav/div/div/ul/li[4]/a")));
    
        // Act
        tryDemoButton.click();
        WebElement submitButton = driver.findElement(By.xpath("/html/body/main/section[1]/div/div/div[1]/div/div/div/div/div/div/div/div[1]/div[5]/div[1]/button[1]"));
        submitButton.click();
    
        // Assert
        wait.until(ExpectedConditions.alertIsPresent());
        String alertMessage = driver.switchTo().alert().getText();
        assertTrue(alertMessage.contains("Please type your first name"), "Error message for empty 'First Name' not found in alert.");
        driver.switchTo().alert().accept();
    }

    // Prueba 4 Home > Demo > Country Dropdown > Costa Rica +506
    // Resultado esperado: Se espera que al seleccionar Costa Rica en el menú desplegable de países, se muestre el código de país +506.
    @Test
    public void testCountryDropdownAndTryDemoButton() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement tryDemoButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/header/nav/div/div/ul/li[4]/a")));
    
        // Act
        tryDemoButton.click();
        WebElement countryDropdown = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/main/section[1]/div/div/div[1]/div/div/div/div/div/div/div/div[1]/div[2]/div[1]/div/div/div/div/select")));
        countryDropdown.sendKeys("Costa Rica");
    
        // Assert
        assertTrue(driver.getPageSource().contains("+506"), "Country code +506 for Costa Rica not found.");
    }

    // Prueba 5 Home > Product > Themes
    // Resultado esperado: Se espera que se redirija correctamente a la página de productos en la seccion temas de PHPTRAVELS y que el título de la página sea "Themes".
    @Test
    public void testNavigateToProductPage() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement productLink = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/header/nav/div/div/ul/li[1]/a/span")));
    
        // Act
        productLink.click();
        WebElement themesLink = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/header/nav/div/div/ul/li[1]/ul/li[1]/a")));
        themesLink.click();
        wait.until(ExpectedConditions.urlContains("phptravels.com/themes"));
    
        // Assert
        assertTrue(driver.getCurrentUrl().contains("phptravels.com/themes"), "Failed to navigate to Themes page.");
        WebElement h1Element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h1[@class='mb-0']")));
        assertTrue(h1Element.getText().equals("Themes"), "Expected h1 text 'Themes' not found on the page.");
    }

    // Prueba 6 Home > Features > Flight Module
    // Resultado esperado: Se espera que se redirija correctamente a la página de características en la sección de módulo de vuelo de PHPTRAVELS y que el título de la página sea "Flights Reservation Module".
    @Test
    public void testNavigateToFeaturesAndFlightModule() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    
        // Act
        WebElement featuresLink = driver.findElement(By.linkText("Features"));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", featuresLink);
        WebElement flightModulesLink = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/header/nav/div/div/ul/li[2]/ul/li[1]/a")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", flightModulesLink);
    
        // Assert
        WebElement h1Element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h1[@class='mb-0']")));
        assertTrue(h1Element.getText().equals("Flights Reservation Module"), "Expected h1 text not found on the page.");
    }

    // Prueba 7 Home > Pricing
    // Resultado esperado: Se espera que se redirija correctamente a la página de precios de PHPTRAVELS y que el título de la página sea "Plans and Prices".
    @Test
    public void testNavigateToPricingPage() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    
        // Act
        driver.findElement(By.linkText("Pricing")).click();
    
        // Assert
        assertTrue(driver.getCurrentUrl().contains("phptravels.com/pricing"), "Failed to navigate to Pricing page.");
        WebElement h1Element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h1[@class='mb-0']")));
        assertTrue(h1Element.getText().equals("Plans and Prices"), "Expected h1 text 'Plans and Prices' not found on the page.");
    }

    // Prueba 8 Home > About Us
    // Resultado esperado: Se espera que se redirija correctamente a la página de acerca de nosotros de PHPTRAVELS y que el título de la página sea "About Us".
    @Test
    public void testNavigateToAboutUsPage() {
        // Arrange
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement aboutUsLink = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//footer//a[text()='About Us']")));
    
        // Act
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", aboutUsLink);
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", aboutUsLink);
    
        // Assert
        WebElement h1Element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h1[contains(text(),'About Us')]")));
        assertTrue(h1Element.getText().equals("About Us"), "Expected h1 text 'About Us' not found on the page.");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}