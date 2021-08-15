package com.ssafy.curator.util;

import com.ssafy.curator.entity.recipe.RecipeEntity;
import com.ssafy.curator.entity.recipe.RecipeIngredientEntity;
import com.ssafy.curator.entity.recipe.RecipeProcessEntity;
import com.ssafy.curator.repository.recipe.RecipeIngredientRepository;
import com.ssafy.curator.repository.recipe.RecipeProcessRepository;
import com.ssafy.curator.repository.recipe.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
public class GetRecipeFromAPI {

    RecipeRepository recipeRepository;
    RecipeIngredientRepository recipeIngredientRepository;
    RecipeProcessRepository recipeProcessRepository;

    @Autowired
    public GetRecipeFromAPI(RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, RecipeProcessRepository recipeProcessRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeProcessRepository = recipeProcessRepository;
    }

    @GetMapping("/addRecipe")
    public void getRecipe() {
        try {
            File file = new File("/usr/local/images/recipe.xml");
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse(file);
            document.getDocumentElement().normalize();
//            System.out.println("Root Element :" + document.getDocumentElement().getNodeName());
            NodeList nList = document.getElementsByTagName("row");
//            System.out.println("----------------------------");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
//                System.out.println("\nCurrent Element :" + nNode.getNodeName());
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
//                    System.out.println("First ROW_NUM : " + eElement.getElementsByTagName("RECIPE_NM_KO").item(0).getTextContent());
                    String RECIPE_ID = eElement.getElementsByTagName("RECIPE_ID").item(0).getTextContent();
                    String RECIPE_NM_KO = eElement.getElementsByTagName("RECIPE_NM_KO").item(0).getTextContent();
                    String SUMRY= eElement.getElementsByTagName("SUMRY").item(0).getTextContent();
                    String NATION_CODE= eElement.getElementsByTagName("NATION_CODE").item(0).getTextContent();
                    String NATION_NM= eElement.getElementsByTagName("NATION_NM").item(0).getTextContent();
                    String TY_CODE= eElement.getElementsByTagName("TY_CODE").item(0).getTextContent();
                    String TY_NM= eElement.getElementsByTagName("TY_NM").item(0).getTextContent();
                    String COOKING_TIME= eElement.getElementsByTagName("COOKING_TIME").item(0).getTextContent();
                    String CALORIE= eElement.getElementsByTagName("CALORIE").item(0).getTextContent();
                    String QNT= eElement.getElementsByTagName("QNT").item(0).getTextContent();
                    String LEVEL_NM= eElement.getElementsByTagName("LEVEL_NM").item(0).getTextContent();
                    String IRDNT_CODE= eElement.getElementsByTagName("IRDNT_CODE").item(0).getTextContent();
                    String PC_NM= eElement.getElementsByTagName("PC_NM").item(0).getTextContent();
                    String IMG_URL= eElement.getElementsByTagName("IMG_URL").item(0).getTextContent();
                    String DET_URL= eElement.getElementsByTagName("DET_URL").item(0).getTextContent();

                    RecipeEntity recipeEntity = new RecipeEntity();
                    recipeEntity.setRECIPE_ID(Long.parseLong(RECIPE_ID));
                    recipeEntity.setCALORIE(CALORIE);
                    recipeEntity.setCOOKING_TIME(COOKING_TIME);
                    recipeEntity.setDET_URL(DET_URL);
                    recipeEntity.setIRDNT_CODE(IRDNT_CODE);
                    recipeEntity.setIMG_URL(IMG_URL);
                    recipeEntity.setRECIPE_NM_KO(RECIPE_NM_KO);
                    recipeEntity.setLEVEL_NM(LEVEL_NM);
                    recipeEntity.setNATION_NM(NATION_NM);
                    recipeEntity.setNATION_CODE(NATION_CODE);
                    recipeEntity.setQNT(QNT);
                    recipeEntity.setPC_NM(PC_NM);
                    recipeEntity.setSUMRY(SUMRY);
                    recipeEntity.setTY_CODE(TY_CODE);
                    recipeEntity.setTY_NM(TY_NM);
                    recipeRepository.save(recipeEntity);
                }
            }
        } catch (IOException | ParserConfigurationException | SAXException e) {
            System.out.println(e);
        }
    }

    @GetMapping("/addRecipeProcess")
    public void addRecipeProcess() {
        try {
            File file = new File("/usr/local/images/recipeProcess.xml");
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse(file);
            document.getDocumentElement().normalize();
//            System.out.println("Root Element :" + document.getDocumentElement().getNodeName());
            NodeList nList = document.getElementsByTagName("row");
//            System.out.println("----------------------------");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
//                System.out.println("\nCurrent Element :" + nNode.getNodeName());
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
//                    System.out.println("First ROW_NUM : " + eElement.getElementsByTagName("RECIPE_NM_KO").item(0).getTextContent());
                    String ROW_NUM = eElement.getElementsByTagName("ROW_NUM").item(0).getTextContent();
                    String RECIPE_ID = eElement.getElementsByTagName("RECIPE_ID").item(0).getTextContent();
                    String COOKING_NO = eElement.getElementsByTagName("COOKING_NO").item(0).getTextContent();
                    String COOKING_DC = eElement.getElementsByTagName("COOKING_DC").item(0).getTextContent();
                    String STRE_STEP_IMAGE_URL = eElement.getElementsByTagName("STRE_STEP_IMAGE_URL").item(0).getTextContent();

                    RecipeProcessEntity recipeProcessEntity = new RecipeProcessEntity();
                    recipeProcessEntity.setROW_NUM(Long.parseLong(ROW_NUM));
                    recipeProcessEntity.setCOOKING_NO(Integer.parseInt(COOKING_NO));
                    recipeProcessEntity.setCOOKING_DC(COOKING_DC);
                    recipeProcessEntity.setSTRE_STEP_IMAGE_URL(STRE_STEP_IMAGE_URL);
                    Optional<RecipeEntity> recipe = recipeRepository.findById(Long.parseLong(RECIPE_ID));

                    if(recipe.isPresent()){
                        recipeProcessEntity.setRecipe(recipe.get());
                    }
                    recipeProcessRepository.save(recipeProcessEntity);
                }
            }
        } catch (IOException | ParserConfigurationException | SAXException e) {
            System.out.println(e);
        }
    }

    @GetMapping("/addRecipeIngredient")
    public void addRecipeIngredient() {
        try {
            File file = new File("/usr/local/images/recipeIngredient.xml");
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse(file);
            document.getDocumentElement().normalize();
//            System.out.println("Root Element :" + document.getDocumentElement().getNodeName());
            NodeList nList = document.getElementsByTagName("row");
//            System.out.println("----------------------------");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
//                System.out.println("\nCurrent Element :" + nNode.getNodeName());
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
//                    System.out.println("First ROW_NUM : " + eElement.getElementsByTagName("RECIPE_NM_KO").item(0).getTextContent());
                    String ROW_NUM = eElement.getElementsByTagName("ROW_NUM").item(0).getTextContent();
                    String RECIPE_ID = eElement.getElementsByTagName("RECIPE_ID").item(0).getTextContent();
                    String IRDNT_SN = eElement.getElementsByTagName("IRDNT_SN").item(0).getTextContent();
                    String IRDNT_NM = eElement.getElementsByTagName("IRDNT_NM").item(0).getTextContent();
                    String IRDNT_CPCTY = eElement.getElementsByTagName("IRDNT_CPCTY").item(0).getTextContent();
                    String IRDNT_TY_CODE = eElement.getElementsByTagName("IRDNT_TY_CODE").item(0).getTextContent();
                    String IRDNT_TY_NM = eElement.getElementsByTagName("IRDNT_TY_NM").item(0).getTextContent();

                    RecipeIngredientEntity recipeIngredientEntity = new RecipeIngredientEntity();
                    recipeIngredientEntity.setROW_NUM(Long.parseLong(ROW_NUM));
//                    recipeIngredientEntity.setRECIPE_ID(Integer.parseInt(RECIPE_ID));
                    recipeIngredientEntity.setIRDNT_SN(Integer.parseInt(IRDNT_SN));
                    recipeIngredientEntity.setIRDNT_NM(IRDNT_NM);
                    recipeIngredientEntity.setIRDNT_CPCTY(IRDNT_CPCTY);
                    recipeIngredientEntity.setIRDNT_TY_CODE(Integer.parseInt(IRDNT_TY_CODE));
                    recipeIngredientEntity.setIRDNT_TY_NM(IRDNT_TY_NM);

                    Optional<RecipeEntity> recipe = recipeRepository.findById(Long.parseLong(RECIPE_ID));

                    if(recipe.isPresent()){
                        recipeIngredientEntity.setRecipe(recipe.get());
                    }
                    recipeIngredientRepository.save(recipeIngredientEntity);

                }
            }
        } catch (IOException | ParserConfigurationException | SAXException e) {
            System.out.println(e);
        }
    }


}
